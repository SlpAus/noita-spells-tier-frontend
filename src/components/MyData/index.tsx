import React, { useState } from "react";
import Box from "../UI/Box";
import { useMode } from "../../contexts/ModeContext";

// Import aliased types and functions for both modes
import { GetReport as GetSpellReport } from "../../utils/spell/GetReport";
import { UserReport as SpellUserReport } from "../../types/spell/report";
import * as SpellReportSections from "./SpellReport";

import { GetPerkReport } from "../../utils/perk/GetPerkReport";
import { UserReport as PerkUserReport } from "../../types/perk/report";
import * as PerkReportSections from "./PerkReport";

// Union type for any kind of report
type AnyUserReport = SpellUserReport | PerkUserReport;

const ReportDisplay = ({ report }: { report: AnyUserReport }) => {
    const { mode } = useMode();

    // Determine which set of section components to use
    const Sections = mode === 'spell' ? SpellReportSections : PerkReportSections;
    // Type assertion is safe here because we are switching based on the same `mode`
    // that was used to fetch the data.
    const typedReport = report as any;

    const hasBasicStats = typedReport.totalVotes > 0;
    const hasTendencies = typedReport.communityConsistencyIndex != null || typedReport.upsetTendency != null;
    const hasHighlights = typedReport.mostChosen || typedReport.highestWinRate || typedReport.chosenOne || typedReport.nemesis || typedReport.mostSubversive;
    const hasMilestones = typedReport.firstVote || (typedReport.milestones && typedReport.milestones.length > 0) || typedReport.busiestDay || typedReport.firstEncounterTop || typedReport.firstEncounterBottom;

    return (
        <div className="mt-4 w-full max-w-3xl text-left text-base bg-gray-700 rounded-2xl p-6 space-y-2">
            <h3 className="text-2xl font-bold text-center">你的个性化报告</h3>
            <p className="text-sm text-center text-gray-400">报告基于 {new Date(typedReport.generatedAt).toLocaleString()} 的数据生成</p>

            {hasBasicStats && <Sections.BasicStatsSection report={typedReport} />}
            {hasTendencies && <Sections.TendenciesSection report={typedReport} />}
            {hasHighlights && <Sections.HighlightsSection report={typedReport} />}
            {hasMilestones && <Sections.MilestonesSection report={typedReport} />}
        </div>
    );
};

export default function MyData() {
    const { mode } = useMode();
    const [reportData, setReportData] = useState<AnyUserReport | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showReport, setShowReport] = useState(false);

    const handleFetchReport = async () => {
        if (showReport) {
            setShowReport(false);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = mode === 'spell' ? await GetSpellReport() : await GetPerkReport();
            setReportData(data);
            setShowReport(true);
        } catch (err) {
            console.error("Error fetching report data:", err);
            setError("无法获取报告，请稍后再试。");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <div className="flex flex-col items-center space-y-4 p-4">
                <button type="button" onClick={handleFetchReport} className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-300" disabled={loading}>
                    {loading ? "加载中..." : showReport ? "收起个性化报告" : "获取个性化报告"}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {showReport && reportData && <ReportDisplay report={reportData} />}
            </div>
        </Box>
    );
}