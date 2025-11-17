export type WaveReportItem = {
    statistics: WaveReportStatistics;
    categories: WaveReportCategories;
    timestamp: number;
}

export type WaveReportStatistics = {
    pagetitle: string;
    pageurl: string;
    AIMscore: number;
    waveurl: string;
}

export type WaveReportCategories = {
    error: WaveReportCategory;
    contrast: WaveReportCategory;
    alert: WaveReportCategory;
}

export type WaveReportCategory = {
    description: string;
    count: number;
}