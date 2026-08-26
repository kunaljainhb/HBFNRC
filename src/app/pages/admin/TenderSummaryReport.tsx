import { useState } from 'react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { useTranslation } from '@/app/context/LanguageContext';
import { Link } from '@/app/context/RouterContext';
import { ArrowLeft, Search, RotateCcw, FileSpreadsheet, FileText } from 'lucide-react';

// Dummy data for the report
const DUMMY_DATA = [
  { id: 'TND-2026-001', title: 'IT Infrastructure Upgrade', category: 'IT Services', created: '2026-01-10', deadline: '2026-03-01', status: 'Published', proposals: 12 },
  { id: 'TND-2026-015', title: 'Management Training', category: 'Consultancy', created: '2026-02-05', deadline: '2026-05-15', status: 'Published', proposals: 4 },
  { id: 'TND-2025-088', title: 'Cloud Migration', category: 'IT Services', created: '2025-10-01', deadline: '2025-12-01', status: 'Closed', proposals: 8 },
  { id: 'TND-2026-042', title: 'Fleet Vehicle Supply', category: 'Logistics', created: '2026-03-01', deadline: '2026-04-10', status: 'Draft', proposals: 0 },
  { id: 'TND-2025-050', title: 'Office Furniture Procurement', category: 'Equipment', created: '2025-08-15', deadline: '2025-09-30', status: 'Cancelled', proposals: 2 },
];

export default function TenderSummaryReport() {
  const { t } = useTranslation();
  const [data] = useState(DUMMY_DATA);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Published':
        return <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">{t(status)}</span>;
      case 'Closed':
        return <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-200">{t(status)}</span>;
      case 'Cancelled':
        return <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 border border-red-200">{t(status)}</span>;
      case 'Draft':
        return <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-300">{t(status)}</span>;
      default:
        return <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200">{t(status)}</span>;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {t('Tender Summary Report')}
            </h1>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="border border-gray-100 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-end gap-4">
            
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">{t('Created Date Range')}</label>
              <div className="flex items-center gap-2">
                <Input type="date" className="h-9 text-sm" />
                <span className="text-gray-400">-</span>
                <Input type="date" className="h-9 text-sm" />
              </div>
            </div>
            
            <div className="w-48">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">{t('Tender Status')}</label>
              <Select>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder={t('All Statuses')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('All Statuses')}</SelectItem>
                  <SelectItem value="Draft">{t('Draft')}</SelectItem>
                  <SelectItem value="Published">{t('Published')}</SelectItem>
                  <SelectItem value="Closed">{t('Closed')}</SelectItem>
                  <SelectItem value="Cancelled">{t('Cancelled')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-48">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">{t('Service Category')}</label>
              <Select>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder={t('All Categories')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('All Categories')}</SelectItem>
                  <SelectItem value="it">{t('IT Services')}</SelectItem>
                  <SelectItem value="construction">{t('Construction')}</SelectItem>
                  <SelectItem value="consultancy">{t('Consultancy')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button className="h-9 px-4 bg-[var(--fnrc-primary-green)] hover:bg-[var(--fnrc-primary-green)]/90 text-white font-semibold flex items-center gap-2">
                <Search className="h-4 w-4" />
                {t('Search')}
              </Button>
              <Button variant="outline" className="h-9 px-4 font-semibold flex items-center gap-2 text-gray-600">
                <RotateCcw className="h-4 w-4" />
                {t('Reset')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table Section */}
      <Card className="border border-gray-100 shadow-sm overflow-hidden">
        <div className="border-b border-gray-100 p-4 bg-gray-50/50 flex justify-between items-center">
          <h2 className="text-sm font-bold text-gray-800">{t('Report Results')}</h2>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-1.5 px-3 text-xs font-semibold border-gray-200">
              <FileSpreadsheet className="h-3.5 w-3.5 text-green-600" />
              {t('Export to Excel')}
            </Button>
            <Button size="sm" variant="outline" className="h-8 gap-1.5 px-3 text-xs font-semibold border-gray-200">
              <FileText className="h-3.5 w-3.5 text-red-500" />
              {t('Export to PDF')}
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-xs uppercase font-semibold text-gray-500">
              <tr>
                <th className="px-4 py-3 whitespace-nowrap">{t('Tender No.')}</th>
                <th className="px-4 py-3 min-w-[200px]">{t('Tender Title')}</th>
                <th className="px-4 py-3 whitespace-nowrap">{t('Service Category')}</th>
                <th className="px-4 py-3 whitespace-nowrap">{t('Created Date')}</th>
                <th className="px-4 py-3 whitespace-nowrap">{t('Submission Deadline')}</th>
                <th className="px-4 py-3 whitespace-nowrap">{t('Tender Status')}</th>
                <th className="px-4 py-3 whitespace-nowrap text-right">{t('Total Proposals')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">{row.id}</td>
                  <td className="px-4 py-3">{row.title}</td>
                  <td className="px-4 py-3">{row.category}</td>
                  <td className="px-4 py-3">{row.created}</td>
                  <td className="px-4 py-3">{row.deadline}</td>
                  <td className="px-4 py-3">{getStatusBadge(row.status)}</td>
                  <td className="px-4 py-3 font-bold text-right text-[var(--fnrc-primary-green)]">{row.proposals}</td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    {t('No data available for the selected filters.')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination Dummy */}
        <div className="border-t border-gray-100 p-4 flex items-center justify-between text-sm text-gray-500">
          <div>{t('Showing 1 to 5 of 5 entries')}</div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="h-8 px-2" disabled>{t('Previous')}</Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-gray-100 font-bold border-transparent">1</Button>
            <Button variant="outline" size="sm" className="h-8 px-2" disabled>{t('Next')}</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
