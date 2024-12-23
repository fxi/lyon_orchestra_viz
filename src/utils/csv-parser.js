import Papa from 'papaparse';

export const parseCSV = async (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

export const extractConfigurations = (data) => {
  if (!data || !Array.isArray(data)) return [];
  
  const configSet = new Set();
  const configs = [];

  data.forEach(row => {
    if (row.code && row.name && !configSet.has(row.code)) {
      configSet.add(row.code);
      configs.push({
        code: row.code,
        name: row.name
      });
    }
  });

  return configs.sort((a, b) => a.name.localeCompare(b.name));
};

export const filterDataByConfiguration = (data, configCode) => {
  if (!data || !Array.isArray(data)) return [];
  return data.filter(row => row.code === configCode);
};

export const processStageData = (data, configCode = null) => {
  if (!data || !Array.isArray(data)) {
    return { data: [], grid: { rows: [], columns: [] } };
  }

  const filteredData = configCode ? filterDataByConfiguration(data, configCode) : data;

  const processedData = filteredData.map(row => ({
    id: Number(row.id),
    instrument: String(row.instrument || ''),
    code: String(row.code || ''),
    name: String(row.name || ''),
    position: {
      raw: String(row.position || ''),
      row: Number(row.row),
      column: String(row.column || '')
    },
    scores: {
      general: Number(row.general),
      space: Number(row.space),
      visibility: Number(row.visibility),
      light: Number(row.light)
    }
  }));

  // Get unique rows and columns for the heat map grid
  const rows = [...new Set(processedData.map(item => item.position.row))]
    .filter(row => !isNaN(row))
    .sort((a, b) => a - b);
  const columns = [...new Set(processedData.map(item => item.position.column))]
    .filter(Boolean)
    .sort();

  return {
    data: processedData,
    grid: {
      rows,
      columns
    }
  };
};

export const processHallData = (data, configCode = null) => {
  if (!data || !Array.isArray(data)) {
    return { data: [], grid: { rows: [], seats: [] } };
  }

  const filteredData = configCode ? filterDataByConfiguration(data, configCode) : data;

  const processedData = filteredData.map(row => ({
    id: Number(row.id),
    section: String(row.section || ''),
    code: String(row.code || ''),
    name: String(row.name || ''),
    position: {
      raw: String(row.position || ''),
      row: Number(row.row),
      seat: String(row.seat || '')
    },
    scores: {
      general: Number(row.general),
      acoustics: Number(row.acoustics),
      visibility: Number(row.visibility),
      comfort: Number(row.comfort)
    }
  }));

  // Get unique rows and seats for the heat map grid
  const rows = [...new Set(processedData.map(item => item.position.row))]
    .filter(row => !isNaN(row))
    .sort((a, b) => a - b);
  const seats = [...new Set(processedData.map(item => item.position.seat))]
    .filter(Boolean)
    .sort();

  return {
    data: processedData,
    grid: {
      rows,
      seats
    }
  };
};

export const calculateAverageScore = (scores) => {
  if (!scores) return null;
  const validScores = Object.values(scores)
    .filter(score => !isNaN(score) && score !== null && score !== undefined);
  return validScores.length > 0
    ? validScores.reduce((sum, score) => sum + score, 0) / validScores.length
    : null;
};
