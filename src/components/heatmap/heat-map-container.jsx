import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HeatMap } from './heat-map';
import { useCSVData } from '../../hooks/use-csv-data';
import { ConfigurationSelector } from '../controls/configuration-selector';
import { ViewModeSelector } from '../controls/view-mode-selector';

export function HeatMapContainer() {
  const { data, configurations, loading, error, getFilteredData } = useCSVData();
  const { t } = useTranslation();

  const [selectedConfig, setSelectedConfig] = useState(null);
  const [locationType, setLocationType] = useState('stage');
  const [dataType, setDataType] = useState('impression');

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-lg font-medium text-muted-foreground">
          {t('loading', 'Loading...')}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-lg font-medium text-destructive">
          {t('error', 'Error loading data')}: {error}
        </div>
      </div>
    );
  }

  const filteredData = selectedConfig 
    ? getFilteredData(locationType, dataType, selectedConfig.code)
    : data[locationType]?.[dataType]?.processed;

  if (!filteredData) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-lg font-medium text-muted-foreground">
          {t('noData', 'No data available')}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <ConfigurationSelector
          configurations={configurations}
          selectedConfig={selectedConfig}
          onConfigChange={setSelectedConfig}
        />
        <ViewModeSelector
          locationType={locationType}
          onLocationChange={setLocationType}
          dataType={dataType}
          onDataTypeChange={setDataType}
        />
      </div>

      {/* Heat Map */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">
          {selectedConfig ? selectedConfig.name : t('heatmap.allConfigurations')}
        </h2>
        <HeatMap 
          data={filteredData.data} 
          grid={filteredData.grid}
          type={locationType}
        />
      </div>

      {/* Legend */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">{t('heatmap.score')}:</span>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((score) => (
            <div key={score} className="flex items-center space-x-1">
              <div className={`h-4 w-4 rounded bg-${score === 1 ? 'red' : score === 2 ? 'orange' : score === 3 ? 'yellow' : score === 4 ? 'lime' : 'green'}-500`} />
              <span className="text-sm">{score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
