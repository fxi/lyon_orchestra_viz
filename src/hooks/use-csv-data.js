import { useState, useEffect } from 'react';
import { parseCSV, processStageData, processHallData, extractConfigurations } from '../utils/csv-parser';

export function useCSVData() {
  const [data, setData] = useState({
    stage: {
      impression: null,
      balance: null,
    },
    hall: {
      impression: null,
      balance: null,
    },
  });
  const [configurations, setConfigurations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCSVFiles = async () => {
      try {
        const base = import.meta.env.BASE_URL;
        // Load and process stage data
        const stageImpressionResponse = await fetch(`${base}data/stage_impression.csv`);
        const stageImpressionText = await stageImpressionResponse.text();
        const stageImpressionData = await parseCSV(stageImpressionText);
        
        const stageBalanceResponse = await fetch(`${base}data/stage_balance.csv`);
        const stageBalanceText = await stageBalanceResponse.text();
        const stageBalanceData = await parseCSV(stageBalanceText);

        // Load and process hall data
        const hallImpressionResponse = await fetch(`${base}data/hall_impression.csv`);
        const hallImpressionText = await hallImpressionResponse.text();
        const hallImpressionData = await parseCSV(hallImpressionText);
        
        const hallBalanceResponse = await fetch(`${base}data/hall_balance.csv`);
        const hallBalanceText = await hallBalanceResponse.text();
        const hallBalanceData = await parseCSV(hallBalanceText);

        // Extract configurations from any dataset (they should be the same)
        const configs = extractConfigurations(stageImpressionData);
        setConfigurations(configs);

        setData({
          stage: {
            impression: {
              raw: stageImpressionData,
              processed: processStageData(stageImpressionData),
            },
            balance: {
              raw: stageBalanceData,
              processed: processStageData(stageBalanceData),
            },
          },
          hall: {
            impression: {
              raw: hallImpressionData,
              processed: processHallData(hallImpressionData),
            },
            balance: {
              raw: hallBalanceData,
              processed: processHallData(hallBalanceData),
            },
          },
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadCSVFiles();
  }, []);

  const getFilteredData = (locationType, dataType, configCode) => {
    if (!data[locationType]?.[dataType]?.raw) return null;

    const processor = locationType === 'stage' ? processStageData : processHallData;
    return processor(data[locationType][dataType].raw, configCode);
  };

  return { 
    data, 
    configurations, 
    loading, 
    error,
    getFilteredData,
  };
}
