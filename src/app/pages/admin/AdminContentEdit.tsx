import { useState, useEffect } from 'react';
import { useNavigate, useParams } from '@/app/context/RouterContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { RichTextEditor } from '@/app/components/ui/rich-text-editor';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/app/context/LanguageContext';
import { cn } from '@/app/components/ui/utils';

export default function AdminContentEdit() {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams(); // content id

  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    descEn: '',
    descAr: '',
    status: 'active'
  });

  useEffect(() => {
    // In a real application, fetch the content details by ID
    // Simulating data fetch
    if (id === '1') {
      setFormData({
        titleEn: 'Privacy Policy',
        titleAr: 'سياسة الخصوصية',
        descEn: '<p>This is the privacy policy...</p>',
        descAr: '<p>هذه هي سياسة الخصوصية...</p>',
        status: 'active'
      });
    } else if (id === '2') {
      setFormData({
        titleEn: 'Terms and Conditions',
        titleAr: 'الشروط والأحكام',
        descEn: '<p>These are the terms and conditions...</p>',
        descAr: '<p>هذه هي الشروط والأحكام...</p>',
        status: 'active'
      });
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleEn || !formData.titleAr) {
      toast.error(t('Please fill all required fields'));
      return;
    }
    
    // Simulate save
    toast.success(t('Content updated successfully'));
    navigate('/admin/content');
  };

  const isRtl = language === 'ar';

  return (
    <div className="space-y-8 font-sans">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/content')} className="gap-2 text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className={cn("h-4 w-4", language === 'ar' && "scale-x-[-1]")} />
          {t('Back to Content Management')}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight leading-tight">
            {t('Edit Content')}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-gray-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-2">
            <CardTitle className="text-lg font-bold text-gray-900">
              {t('General Information')}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-gray-700 font-semibold">
                  {t('Title (English)')} <span className="text-red-500">*</span>
                </Label>
                <Input 
                  value={formData.titleEn}
                  onChange={(e) => setFormData({...formData, titleEn: e.target.value})}
                  placeholder={t('Enter English Title')}
                  className="rounded-xl h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-semibold">
                  {t('Title (Arabic)')} <span className="text-red-500">*</span>
                </Label>
                <Input 
                  value={formData.titleAr}
                  onChange={(e) => setFormData({...formData, titleAr: e.target.value})}
                  placeholder={t('Enter Arabic Title')}
                  className="rounded-xl h-12"
                  dir="rtl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 font-semibold">
                {t('English Description')}
              </Label>
              <RichTextEditor 
                id="descEn"
                value={formData.descEn}
                onChange={(val: string) => setFormData({...formData, descEn: val})}
                placeholder={t('Enter English Description')}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 font-semibold">
                {t('Arabic Description')}
              </Label>
              <div dir="rtl">
                <RichTextEditor 
                  id="descAr"
                  value={formData.descAr}
                  onChange={(val: string) => setFormData({...formData, descAr: val})}
                  placeholder={t('Enter Arabic Description')}
                />
              </div>
            </div>

            <div className="w-full max-w-md space-y-2">
              <Label className="text-gray-700 font-semibold">
                {t('Status')}
              </Label>
              <Select 
                value={formData.status} 
                onValueChange={(val) => setFormData({...formData, status: val})}
              >
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder={t('Select Status')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">{t('Active')}</SelectItem>
                  <SelectItem value="inactive">{t('Inactive')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3 pt-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/admin/content')}
            className="min-w-[120px] rounded-xl h-12"
          >
            {t('Cancel')}
          </Button>
          <Button 
            type="submit" 
            className="min-w-[150px] text-white hover:opacity-90 rounded-xl h-12 border-none shadow-none"
            style={{ backgroundColor: 'var(--fnrc-primary-green)' }}
          >
            {t('Save')}
          </Button>
        </div>
      </form>
    </div>
  );
}
