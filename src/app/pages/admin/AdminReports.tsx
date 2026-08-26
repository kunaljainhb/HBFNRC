import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { BarChart3, FileText, LayoutList } from 'lucide-react';
import { useTranslation } from '@/app/context/LanguageContext';
import { Link } from '@/app/context/RouterContext';

export default function AdminReports() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {t('System Reports')}
          </h1>
          <p className="text-gray-500 mt-2">
            {t('Access and generate system analytics and operational reports.')}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Vendor Onboarding Status Report */}
        <Link to="/admin/reports/vendor-onboarding" className="block group">
          <Card className="border border-gray-100/50 shadow-sm overflow-hidden h-full transition-all hover:shadow-md hover:border-gray-200">
            <CardHeader className="border-b border-gray-50 pb-5">
              <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-900 group-hover:text-[var(--fnrc-primary-green)] transition-colors">
                <BarChart3 className="h-5 w-5 text-[var(--fnrc-primary-green)]" />
                {t('Vendor Onboarding Status')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-500 leading-relaxed">
                {t('View and export detailed status reports of vendor onboarding applications, filtered by date range and service categories.')}
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Vendor Wise Tender Report */}
        <Link to="/admin/reports/vendor-tender" className="block group">
          <Card className="border border-gray-100/50 shadow-sm overflow-hidden h-full transition-all hover:shadow-md hover:border-gray-200">
            <CardHeader className="border-b border-gray-50 pb-5">
              <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-900 group-hover:text-[var(--fnrc-primary-green)] transition-colors">
                <FileText className="h-5 w-5 text-[var(--fnrc-accent-gold)]" />
                {t('Vendor Wise Tender')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-500 leading-relaxed">
                {t('Analyze proposals submitted by specific vendors across different tenders and view their current proposal statuses.')}
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Tender Summary Report */}
        <Link to="/admin/reports/tender-summary" className="block group">
          <Card className="border border-gray-100/50 shadow-sm overflow-hidden h-full transition-all hover:shadow-md hover:border-gray-200">
            <CardHeader className="border-b border-gray-50 pb-5">
              <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-900 group-hover:text-[var(--fnrc-primary-green)] transition-colors">
                <LayoutList className="h-5 w-5 text-blue-500" />
                {t('Tender Summary')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-500 leading-relaxed">
                {t('Comprehensive overview of all system tenders, statuses, and total proposals received within a specified date range.')}
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
