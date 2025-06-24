import React, { useState } from 'react';
import { HazeIcon as Activity, Clock, FileText, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, XCircle, Download, Share, Link } from 'lucide-react';

interface LogAnalysis {
  id: string;
  url: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'error';
  metrics: {
    totalLines: number;
    errorLines: number;
    warningLines: number;
    executionTime: string;
    memoryUsage: string;
    cpuUsage: string;
  };
  insights: string[];
  summary: string;
}

const mockAnalyses: LogAnalysis[] = [
  {
    id: '1',
    url: 'https://example.com/logs/deploy-2024-01-15.log',
    timestamp: new Date('2024-01-15T10:30:00'),
    status: 'success',
    metrics: {
      totalLines: 1247,
      errorLines: 0,
      warningLines: 3,
      executionTime: '2m 34s',
      memoryUsage: '256MB',
      cpuUsage: '12%'
    },
    insights: [
      'Deployment completed successfully with minimal warnings',
      'Performance metrics within acceptable range',
      '3 minor warnings related to deprecated API usage'
    ],
    summary: 'Clean deployment with excellent performance metrics'
  },
  {
    id: '2',
    url: 'https://example.com/logs/backup-2024-01-14.log',
    timestamp: new Date('2024-01-14T02:15:00'),
    status: 'warning',
    metrics: {
      totalLines: 892,
      errorLines: 2,
      warningLines: 8,
      executionTime: '5m 12s',
      memoryUsage: '512MB',
      cpuUsage: '28%'
    },
    insights: [
      'Backup process completed but with performance concerns',
      'Memory usage higher than recommended threshold',
      'Two non-critical errors in secondary processes'
    ],
    summary: 'Backup successful but requires performance optimization'
  }
];

function App() {
  const [activeTab, setActiveTab] = useState<'current' | 'historical'>('current');
  const [logUrl, setLogUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<LogAnalysis | null>(null);
  const [historicalAnalyses] = useState<LogAnalysis[]>(mockAnalyses);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAnalyze = async () => {
    if (!logUrl.trim()) return;
    
    setIsAnalyzing(true);
    setIsExpanded(false);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockAnalysis: LogAnalysis = {
      id: Date.now().toString(),
      url: logUrl,
      timestamp: new Date(),
      status: Math.random() > 0.7 ? 'warning' : Math.random() > 0.3 ? 'success' : 'error',
      metrics: {
        totalLines: Math.floor(Math.random() * 2000) + 500,
        errorLines: Math.floor(Math.random() * 10),
        warningLines: Math.floor(Math.random() * 20),
        executionTime: `${Math.floor(Math.random() * 10) + 1}m ${Math.floor(Math.random() * 60)}s`,
        memoryUsage: `${Math.floor(Math.random() * 500) + 100}MB`,
        cpuUsage: `${Math.floor(Math.random() * 80) + 5}%`
      },
      insights: [
        'Analysis completed successfully',
        'Performance metrics analyzed',
        'Script execution patterns identified'
      ],
      summary: 'Comprehensive log analysis completed'
    };
    
    setCurrentAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  const getStatusIcon = (status: LogAnalysis['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: LogAnalysis['status']) => {
    switch (status) {
      case 'success':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'warning':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Log Analyzer</h1>
              <p className="text-gray-500 text-sm">Analyze script logs and performance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Input Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex space-x-3">
            <div className="flex-1">
              <input
                type="url"
                value={logUrl}
                onChange={(e) => setLogUrl(e.target.value)}
                placeholder="Enter script log URL"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors text-gray-900 placeholder-gray-400"
                disabled={isAnalyzing}
              />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={!logUrl.trim() || isAnalyzing}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Analyzing</span>
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4" />
                  <span>Analyze</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6">
          <button
            onClick={() => setActiveTab('current')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'current'
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Current
          </button>
          <button
            onClick={() => setActiveTab('historical')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'historical'
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            History ({historicalAnalyses.length})
          </button>
        </div>

        {/* Content Area */}
        {activeTab === 'current' ? (
          <div className="space-y-6">
            {isAnalyzing ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12">
                <div className="flex flex-col items-center text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-900 border-t-transparent mb-4"></div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Analyzing log file</h3>
                  <p className="text-gray-500">Processing your script log...</p>
                </div>
              </div>
            ) : currentAnalysis ? (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Summary View */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(currentAnalysis.status)}
                      <div>
                        <h3 className="font-medium text-gray-900">Analysis Complete</h3>
                        <p className="text-sm text-gray-500 mt-1">{currentAnalysis.url}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                        <Share className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-gray-900">{currentAnalysis.metrics.totalLines.toLocaleString()}</div>
                      <div className="text-xs text-gray-500 mt-1">Lines</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-red-600">{currentAnalysis.metrics.errorLines}</div>
                      <div className="text-xs text-gray-500 mt-1">Errors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-amber-600">{currentAnalysis.metrics.warningLines}</div>
                      <div className="text-xs text-gray-500 mt-1">Warnings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-gray-900">{currentAnalysis.metrics.executionTime}</div>
                      <div className="text-xs text-gray-500 mt-1">Runtime</div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-gray-700">{currentAnalysis.summary}</p>
                  </div>

                  {/* Expand Button */}
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full flex items-center justify-center space-x-2 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span className="text-sm font-medium">
                      {isExpanded ? 'Show Less' : 'Show Details'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Detailed View */}
                {isExpanded && (
                  <div className="border-t border-gray-100 p-6 space-y-6">
                    {/* Performance Metrics */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Performance Metrics</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Memory Usage</span>
                            <span className="font-medium text-gray-900">{currentAnalysis.metrics.memoryUsage}</span>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">CPU Usage</span>
                            <span className="font-medium text-gray-900">{currentAnalysis.metrics.cpuUsage}</span>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Execution Time</span>
                            <span className="font-medium text-gray-900">{currentAnalysis.metrics.executionTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Insights */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Key Insights</h4>
                      <div className="space-y-3">
                        {currentAnalysis.insights.map((insight, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-700 text-sm">{insight}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Analysis Details */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Analysis Details</h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Analyzed on:</span>
                            <span className="ml-2 text-gray-900">{currentAnalysis.timestamp.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Status:</span>
                            <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getStatusColor(currentAnalysis.status)}`}>
                              {currentAnalysis.status.charAt(0).toUpperCase() + currentAnalysis.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <Activity className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to analyze</h3>
                  <p className="text-gray-500">Enter a script log URL to get started</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {historicalAnalyses.length > 0 ? (
              historicalAnalyses.map((analysis) => (
                <div key={analysis.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(analysis.status)}
                      <div>
                        <h4 className="font-medium text-gray-900">{analysis.url}</h4>
                        <p className="text-sm text-gray-500 mt-1">{analysis.timestamp.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{analysis.metrics.totalLines} lines</span>
                      <span>{analysis.metrics.errorLines} errors</span>
                      <span>{analysis.metrics.executionTime}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-3 text-sm">{analysis.summary}</p>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No history yet</h3>
                  <p className="text-gray-500">Your analysis history will appear here</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;