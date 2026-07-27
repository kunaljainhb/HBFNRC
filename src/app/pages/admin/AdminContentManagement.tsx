import { useState, useEffect } from 'react';
import { useNavigate } from '@/app/context/RouterContext';
import { Eye, Pencil, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import { SearchFilterBar } from '@/app/components/ui/search-filter-bar';
import { StatusBadge } from '@/app/components/ui/status-badge';
import { useTranslation } from '@/app/context/LanguageContext';

const mockContents = [
  {
    id: '1',
    title: 'Privacy Policy',
    status: 'active'
  },
  {
    id: '2',
    title: 'Terms and Conditions',
    status: 'active'
  }
];

export default function AdminContentManagement() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  const filteredContents = mockContents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || content.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredContents.length / itemsPerPage) || 1;
  const paginatedContents = filteredContents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const filters = [
    {
      key: 'status',
      label: t('Status'),
      options: [
        { label: t('All'), value: 'all' },
        { label: t('Active'), value: 'active' },
        { label: t('Inactive'), value: 'inactive' },
      ],
      selectedValue: statusFilter,
      onChange: setStatusFilter,
    }
  ];

  const activeChips = statusFilter !== 'all' ? [
    {
      label: `${t('Status')}: ${t(statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1))}`,
      onRemove: () => setStatusFilter('all')
    }
  ] : [];

  const handleClearAll = () => {
    setSearchQuery('');
    setStatusFilter('all');
  };

  return (
    <div className="space-y-2 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {t("Content Management")}
          </h1>
        </div>
      </div>

      <div className="pt-2">
        <SearchFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder={t('Search by Title...')}
          filters={filters}
          activeChips={activeChips}
          onClearAll={handleClearAll}
          className="mb-8"
        />

        <Card className="border-gray-200 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/80 hover:bg-gray-50/80 border-b border-gray-100">
                    <TableHead className="py-4 text-gray-700 font-semibold">{t('Title')}</TableHead>
                    <TableHead className="py-4 text-gray-700 font-semibold text-center">{t('Preview')}</TableHead>
                    <TableHead className="py-4 text-gray-700 font-semibold">{t('Status')}</TableHead>
                    <TableHead className="py-4 text-right text-gray-700 font-semibold">{t('Action')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedContents.length > 0 ? (
                    paginatedContents.map((content) => (
                      <TableRow key={content.id} className="hover:bg-gray-50/50 transition-colors">
                        <TableCell className="py-4">
                          <span className="font-semibold text-gray-900">{t(content.title)}</span>
                        </TableCell>
                        <TableCell className="py-4 text-center">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full mx-auto"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell className="py-4">
                          <StatusBadge status={content.status} />
                        </TableCell>
                        <TableCell className="py-4 text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => navigate(`/admin/content/edit/${content.id}`)}
                            className="h-8 w-8 text-gray-400 hover:text-[var(--fnrc-primary-green)] hover:bg-[var(--fnrc-primary-green)]/10 rounded-full"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        {t('No content found.')}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination */}
            {filteredContents.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-gray-100 bg-gray-50/30">
                <div className="text-[13px] text-gray-500 font-medium">
                  {t('Showing')} {(currentPage - 1) * itemsPerPage + 1} {t('to')} {Math.min(currentPage * itemsPerPage, filteredContents.length)} {t('of')} {filteredContents.length} {t('entries')}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="h-8 w-8 rounded-lg border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(i + 1)}
                      className={`h-8 min-w-[32px] rounded-lg font-medium transition-all ${
                        currentPage === i + 1 
                          ? 'bg-[var(--fnrc-primary-green)] text-white hover:bg-[var(--fnrc-primary-green)]/90 shadow-sm' 
                          : 'border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 rounded-lg border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
