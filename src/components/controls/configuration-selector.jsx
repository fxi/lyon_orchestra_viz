import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function ConfigurationSelector({ configurations, selectedConfig, onConfigChange }) {
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
        {selectedConfig ? selectedConfig.name : t('heatmap.selectConfiguration')}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {configurations.map((config) => (
          <DropdownMenuItem
            key={config.code}
            onClick={() => onConfigChange(config)}
          >
            {config.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

ConfigurationSelector.propTypes = {
  configurations: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedConfig: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  onConfigChange: PropTypes.func.isRequired,
};
