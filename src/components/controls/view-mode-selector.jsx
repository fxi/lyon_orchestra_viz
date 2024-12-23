import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export function ViewModeSelector({ 
  locationType, 
  onLocationChange, 
  dataType, 
  onDataTypeChange 
}) {
  const { t } = useTranslation();

  return (
    <div className="flex gap-4">
      <div className="flex rounded-lg border border-input p-1">
        <button
          className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors 
            ${locationType === 'stage' 
              ? 'bg-primary text-primary-foreground shadow-sm' 
              : 'hover:bg-accent hover:text-accent-foreground'
            }`}
          onClick={() => onLocationChange('stage')}
        >
          {t('heatmap.stage')}
        </button>
        <button
          className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors
            ${locationType === 'hall'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'hover:bg-accent hover:text-accent-foreground'
            }`}
          onClick={() => onLocationChange('hall')}
        >
          {t('heatmap.hall')}
        </button>
      </div>

      <div className="flex rounded-lg border border-input p-1">
        <button
          className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors
            ${dataType === 'impression'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'hover:bg-accent hover:text-accent-foreground'
            }`}
          onClick={() => onDataTypeChange('impression')}
        >
          {t('heatmap.impressions')}
        </button>
        <button
          className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors
            ${dataType === 'balance'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'hover:bg-accent hover:text-accent-foreground'
            }`}
          onClick={() => onDataTypeChange('balance')}
        >
          {t('heatmap.balance')}
        </button>
      </div>
    </div>
  );
}

ViewModeSelector.propTypes = {
  locationType: PropTypes.oneOf(['stage', 'hall']).isRequired,
  onLocationChange: PropTypes.func.isRequired,
  dataType: PropTypes.oneOf(['impression', 'balance']).isRequired,
  onDataTypeChange: PropTypes.func.isRequired,
};
