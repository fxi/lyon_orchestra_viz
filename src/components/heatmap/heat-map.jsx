import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { calculateAverageScore } from '../../utils/csv-parser';

const SCORE_COLORS = {
  1: 'bg-red-500',
  2: 'bg-orange-500',
  3: 'bg-yellow-500',
  4: 'bg-lime-500',
  5: 'bg-green-500',
};

const EMPTY_CELL = 'bg-gray-200 dark:bg-gray-700 [background-image:linear-gradient(45deg,rgba(0,0,0,.1)_25%,transparent_25%,transparent_50%,rgba(0,0,0,.1)_50%,rgba(0,0,0,.1)_75%,transparent_75%,transparent)] [background-size:24px_24px]';

export function HeatMap({ data = [], grid = { rows: [], columns: [] }, type = 'stage' }) {
  const { t } = useTranslation();

  const getCellContent = (row, col) => {
    if (!Array.isArray(data)) return null;

    const cell = data.find(item => {
      if (!item?.position) return false;
      return type === 'stage'
        ? (item.position.row === row && item.position.column === col)
        : (item.position.row === row && item.position.seat === col);
    });

    if (!cell) return null;

    const avgScore = calculateAverageScore(cell.scores);
    if (avgScore === null) return null;

    return {
      score: avgScore,
      tooltip: `
        ${type === 'stage' ? cell.instrument : cell.section}
        ${cell.name}
        ${t('heatmap.score')}: ${avgScore.toFixed(1)}
      `.trim(),
    };
  };

  if (!grid?.rows?.length || !grid?.columns?.length) {
    return (
      <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
        <p className="text-sm text-muted-foreground">{t('heatmap.empty')}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="grid gap-1" style={{ 
          gridTemplateColumns: `auto ${grid.columns.map(() => '1fr').join(' ')}` 
        }}>
          {/* Column headers */}
          <div className="h-10" /> {/* Empty corner cell */}
          {grid.columns.map((col) => (
            <div key={col} className="flex h-10 items-center justify-center font-medium">
              {col}
            </div>
          ))}

          {/* Grid rows */}
          {grid.rows.map((row) => (
            <React.Fragment key={row}>
              {/* Row header */}
              <div className="flex h-10 items-center justify-center font-medium">
                {row}
              </div>

              {/* Row cells */}
              {grid.columns.map((col) => {
                const cell = getCellContent(row, col);
                return (
                  <div
                    key={`${row}-${col}`}
                    className={`
                      relative h-10 rounded-md transition-colors
                      ${cell ? SCORE_COLORS[Math.round(cell.score)] : EMPTY_CELL}
                    `}
                    title={cell?.tooltip}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

HeatMap.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    position: PropTypes.shape({
      row: PropTypes.number,
      column: PropTypes.string,
      seat: PropTypes.string,
    }),
    scores: PropTypes.object,
  })),
  grid: PropTypes.shape({
    rows: PropTypes.arrayOf(PropTypes.number),
    columns: PropTypes.arrayOf(PropTypes.string),
  }),
  type: PropTypes.oneOf(['stage', 'hall']),
};
