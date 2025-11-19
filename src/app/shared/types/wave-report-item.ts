export type WaveReportItem = {
    status: WaveReportStatus;
    statistics: WaveReportStatistics;
    categories: WaveReportCategories;
    timestamp: number;
    slug: string;
    favicon?: string;
}

export type WaveReportStatus = {
    success: boolean;
    httpstatuscode: number;
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