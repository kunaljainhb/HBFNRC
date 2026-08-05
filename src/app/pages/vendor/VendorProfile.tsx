import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { CheckCircle, Download, Upload, FileText, Shield, AlertTriangle, Building2, Info, Clock } from 'lucide-react';
import { mockVendorDocuments } from '@/app/data/mockData';
import { StatusBadge } from '@/app/components/ui/status-badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/components/ui/tooltip';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/ui/tabs';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Globe, Phone, Mail, MapPin, Landmark, UserCircle, Briefcase, Lock, KeyRound } from 'lucide-react';
import { useTranslation } from '@/app/context/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/app/components/ui/dialog';

export default function VendorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState('Approved');
  const [activeTab, setActiveTab] = useState('company');
  const { t, language } = useTranslation();
  
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [documentToUpload, setDocumentToUpload] = useState<any>(null);
  const [uploadIssueDate, setUploadIssueDate] = useState('');
  const [uploadExpiryDate, setUploadExpiryDate] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  
  // Detailed vendor data (mock)
  const [vendorData, setVendorData] = useState({
    companyNameEn: 'TechSolutions LLC',
    companyNameAr: 'تيك سوليوشنز ذ.م.م',
    tradeLicense: 'TL-123456',
    licenseExpiry: '2026-12-31',
    address: 'Dubai Silicon Oasis, Dubai, UAE',
    country: 'United Arab Emirates',
    stateEmirate: 'Dubai',
    city: 'Dubai',
    phone: '+971 4 123 4567',
    fax: '+971 4 123 4568',
    email: 'contact@techsolutions.ae',
    website: 'www.techsolutions.ae',
    categories: ['Information Technology', 'Consulting'],
    primaryContact: {
      name: 'John Doe',
      jobTitle: 'Account Manager',
      mobile: '+971 50 987 6543',
      email: 'john.doe@techsolutions.ae'
    },
    financialInfo: {
      accountNumber: '100234567890',
      bankAccount: 'AE12 3456 7890 1234 5678 901',
      bankName: 'Emirates NBD',
      accountHolderName: 'TechSolutions LLC',
      swiftCode: 'EBILAEADXXX',
      vatNumber: '100012345600003'
    }
  });

  const availableCategories = [
    'Information Technology',
    'Consulting',
    'Construction',
    'Facilities Management',
    'Logistics',
    'Marketing',
    'HR Services'
  ];

  const handleCategoryToggle = (category: string) => {
    setVendorData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  // Get documents for VEN-001
  const [documents, setDocuments] = useState(mockVendorDocuments.filter(doc => doc.vendorId === 'VEN-001').map(doc => ({
    ...doc,
    issueDate: '2023-12-15'
  })));

  const handleUploadDocument = () => {
    if (documentToUpload) {
      setDocuments(prev => prev.map(doc => {
        if (doc.id === documentToUpload.id) {
          return {
            ...doc,
            issueDate: uploadIssueDate,
            expiryDate: uploadExpiryDate,
            uploadDate: new Date().toISOString().split('T')[0],
            status: 'pending'
          };
        }
        return doc;
      }));
    } else {
      const newDoc = {
        id: `DOC-NEW-${Date.now()}`,
        vendorId: 'VEN-001',
        name: uploadFile ? uploadFile.name : 'New Document',
        documentType: 'Other',
        uploadDate: new Date().toISOString().split('T')[0],
        issueDate: uploadIssueDate,
        expiryDate: uploadExpiryDate,
        status: 'pending',
        fileSize: uploadFile ? `${(uploadFile.size / (1024 * 1024)).toFixed(1)} MB` : '1.0 MB',
        isRegulatory: false
      };
      setDocuments(prev => [...prev, newDoc]);
    }
    setIsUploadModalOpen(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    setRegistrationStatus('Correction Requested');
  };

  const isSubmitted = registrationStatus === 'Pending' || registrationStatus === 'Approved';

  const getExpiryDays = (expiryDate?: string) => {
    if (!expiryDate) return null;
    const today = new Date('2026-02-20');
    const expiry = new Date(expiryDate);
    return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-8 text-start">
      {/* Upper action header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-[32px] font-bold tracking-tight text-gray-800 leading-tight">
            {t('Profile Settings')}
          </h1>
        </div>
        <div className="flex items-center gap-3 p-2 rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1 mr-1 flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-gray-400" />
            {t('Review Actions:')}
          </div>
          <div className="flex gap-1.5">
            <Button 
              size="sm"
              variant={registrationStatus === 'Approved' ? 'default' : 'outline'}
              onClick={() => setRegistrationStatus('Approved')}
              className={`h-8 font-semibold text-xs rounded-button transition-all cursor-pointer ${
                registrationStatus === 'Approved' 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm' 
                  : 'text-gray-500 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {t('Approved')}
            </Button>
            <Button 
              size="sm"
              variant={registrationStatus === 'Pending' ? 'default' : 'outline'}
              onClick={() => setRegistrationStatus('Pending')}
              className={`h-8 font-semibold text-xs rounded-button transition-all cursor-pointer ${
                registrationStatus === 'Pending' 
                  ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm' 
                  : 'text-gray-500 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {t('Pending')}
            </Button>
            <Button 
              size="sm"
              variant={registrationStatus === 'Correction Requested' || registrationStatus === 'Correction Required' ? 'default' : 'outline'}
              onClick={() => setRegistrationStatus('Correction Required')}
              className={`h-8 font-semibold text-xs rounded-button transition-all cursor-pointer ${
                registrationStatus === 'Correction Requested' || registrationStatus === 'Correction Required'
                  ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-sm' 
                  : 'text-gray-500 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {t('Correction Required')}
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Modernized Segmented Tabs List */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200/80 pb-2 gap-4">
          <TabsList className="bg-gray-100/80 border border-gray-200/20 p-1 rounded-xl h-10 w-full sm:w-[360px] flex shrink-0">
            <TabsTrigger value="company" className="flex items-center justify-center gap-2 font-semibold text-xs rounded-lg py-1.5 transition-all w-1/2">
              <Building2 className="h-3.5 w-3.5" />
              {t('Company Profile')}
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center justify-center gap-2 font-semibold text-xs rounded-lg py-1.5 transition-all w-1/2">
              <Lock className="h-3.5 w-3.5" />
              {t('Change Password')}
            </TabsTrigger>
          </TabsList>

          {activeTab === 'company' && (
            <div className="flex justify-end">
              {isEditing ? (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)} className="rounded-button text-xs font-semibold h-9 px-4 cursor-pointer">
                    {t('Cancel')}
                  </Button>
                  <Button onClick={handleSave} className="bg-[var(--fnrc-primary-green)] text-white hover:bg-[var(--fnrc-primary-green)]/90 rounded-button text-xs font-semibold h-9 px-4 shadow-sm cursor-pointer">
                    {t('Save Changes')}
                  </Button>
                </div>
              ) : (
                <Button variant="outline" onClick={() => setIsEditing(true)} className="rounded-button text-xs font-semibold border-gray-200 hover:bg-gray-50 h-9 px-4 flex items-center gap-1.5 cursor-pointer">
                  {t('Edit Profile')}
                </Button>
              )}
            </div>
          )}
        </div>

        {/* --- COMPANY PROFILE TAB --- */}
        <TabsContent value="company" className="space-y-6 mt-6 focus-visible:outline-none">
          {/* Profile Overview Header Card */}
          <Card className="shadow-card border-none bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-[var(--fnrc-primary-green)]/10 flex items-center justify-center text-[var(--fnrc-primary-green)]">
                    <Building2 className="h-8 w-8" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-[22px] font-bold text-gray-800 leading-none">{language === 'ar' ? vendorData.companyNameAr : vendorData.companyNameEn}</h2>
                    <div className="flex flex-wrap items-center gap-2.5 mt-2">
                      <StatusBadge status={registrationStatus} />
                      <span className="text-[14px] text-black font-bold">{t('Vendor ID:')} VEN-001</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
                {/* Company Details */}
                <Card className="shadow-card border-none bg-white">
                  <CardHeader className="px-6 pt-1 pb-0">
                    <CardTitle className="text-lg font-bold text-black">
                      {t('Company Details')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-4 pt-0">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label className="text-[14px] text-black font-bold">{t('Company Name (English)')}</Label>
                        {isEditing ? (
                          <Input value={vendorData.companyNameEn} onChange={(e) => setVendorData({...vendorData, companyNameEn: e.target.value})} className="rounded-input h-10 border-gray-200 text-start" />
                        ) : (
                          <div className="font-normal text-[14px] text-gray-700 p-2.5 rounded-lg border border-gray-100/50 bg-gray-50/30 text-start">{vendorData.companyNameEn}</div>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[14px] text-black font-bold">{t('Company Name (Arabic)')}</Label>
                        {isEditing ? (
                          <Input value={vendorData.companyNameAr} className="rounded-input h-10 border-gray-200 text-start" onChange={(e) => setVendorData({...vendorData, companyNameAr: e.target.value})} />
                        ) : (
                          <div className="font-normal text-[14px] text-gray-700 p-2.5 rounded-lg border border-gray-100/50 bg-gray-50/30 text-start">{vendorData.companyNameAr}</div>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[14px] text-black font-bold">{t('Trade License Number')}</Label>
                        {isEditing ? (
                          <Input value={vendorData.tradeLicense} onChange={(e) => setVendorData({...vendorData, tradeLicense: e.target.value})} className="rounded-input h-10 border-gray-200 text-start" />
                        ) : (
                          <div className="font-normal text-[14px] text-gray-700 p-2.5 rounded-lg border border-gray-100/50 bg-gray-50/30 text-start">{vendorData.tradeLicense}</div>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[14px] text-black font-bold">{t('License Expiry Date')}</Label>
                        {isEditing ? (
                          <Input type="date" value={vendorData.licenseExpiry} onChange={(e) => setVendorData({...vendorData, licenseExpiry: e.target.value})} className="rounded-input h-10 border-gray-200 text-start" />
                        ) : (
                          <div className="font-normal text-[14px] text-gray-700 p-2.5 rounded-lg border border-gray-100/50 bg-gray-50/30 text-start">{new Date(vendorData.licenseExpiry).toLocaleDateString(language === 'ar' ? 'ar-AE' : 'en-GB')}</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
{/* Contact Information */}
<Card className="shadow-card border-none bg-white">
  <CardHeader className="px-6 pt-1 pb-0">
    <CardTitle className="text-lg font-bold text-black">
      {t('Contact Info')}
    </CardTitle>
  </CardHeader>
  <CardContent className="px-6 pb-4 pt-0">
    <div className="grid gap-5">
      <div className="space-y-1.5">
        <Label className="text-[14px] text-black font-bold">{t('Office Address')}</Label>
        {isEditing ? (
          <Input value={vendorData.address} onChange={(e) => setVendorData({...vendorData, address: e.target.value})} className="rounded-input h-10 border-gray-200 text-start" />
        ) : (
          <div className="font-normal text-[14px] text-gray-700 p-2.5 rounded-lg border border-gray-100/50 bg-gray-50/30 text-start">{vendorData.address}</div>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label className="text-[14px] text-black font-bold">{t('Country')}</Label>
          {isEditing ? (
            <Input value={vendorData.country} onChange={(e) => setVendorData({...vendorData, country: e.target.value})} className="rounded-input h-10 border-gray-200 text-start" />
          ) : (
            <div className="font-normal text-[14px] text-gray-700 p-2.5 rounded-lg border border-gray-100/50 bg-gray-50/30 text-start">{vendorData.country}</div>
          )}
        </div>
        <div className="space-y-1.5">
          <Label className="text-[14px] text-black font-bold">{t('State / Emirate')}</Label>
          {isEditing ? (
            <Input value={vendorData.stateEmirate} onChange={(e) => setVendorData({...vendorData, stateEmirate: e.target.value})} className="rounded-input h-10 border-gray-200 text-start" />
          ) : (
            <div className="font-normal text-[14px] text-gray-700 p-2.5 rounded-lg border border-gray-100/50 bg-gray-50/30 text-start">{vendorData.stateEmirate}</div>
          )}
        </div>
        <div className="space-y-1.5">
          <Label className="text-[14px] text-black font-bold">{t('City')}</Label>
          {isEditing ? (
            <Input value={vendorData.city} onChange={(e) => setVendorData({...vendorData, city: e.target.value})} className="rounded-input h-10 border-gray-200 text-start" />
          ) : (
            <div className="font-normal text-[14px] text-gray-700 p-2.5 rounded-lg border border-gray-100/50 bg-gray-50/30 text-start">{vendorData.city}</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label className="text-[14px] text-black font-bold">{t('Phone Number')}</Label>
          {isEditing ? (
            <Input value={vendorData.phone} onChange={(e) => setVendorData({...vendorData, phone: e.target.value})} className="rounded-input h-10 border-gray-200 text-start" />
          ) : (
            <div className="font-normal text-[14px] text-gray-700 p-2.5 rounded-lg border border-gray-100/50 bg-gray-50/30 flex items-center gap-2 text-start">
              <Phone className="h-4 w-4 text-gray-400 shrink-0" /> 
              {vendorData.phone}
            </div>
          )}
        </div>
        <div className="space-y-1.5">
          <Label className="text-[14px] text-black font-bold">{t('Fax Number')}</Label>
          {isEditing ? (
            <Input value={vendorData.fax} onChange={(e) => setVendorData({...vendorData, fax: e.target.value})} className="rounded-input h-10 border-gray-200 text-start" />
          ) : (
            <div className="font-normal text-[14px] text-gray-700 p-2.5 rounded-lg border border-gray-100/50 bg-gray-50/30 flex items-center gap-2 text-start">
              <Phone className="h-4 w-4 text-gray-400 shrink-0" /> 
              {vendorData.fax}
            </div>
          )}
        </div>
        <div className="space-y-1.5">
          <Label className="text-[14px] text-black font-bold">{t('Email ID')}</Label>
          {isEditing ? (
            <Input value={vendorData.email} onChange={(e) => setVendorData({...vendorData, email: e.target.value})} className="rounded-input h-10 border-gray-200 text-start" />
          ) : (
            <div className="font-normal text-[14px] text-gray-700 p-2.5 rounded-lg border border-gray-100/50 bg-gray-50/30 flex items-center gap-2 text-start">
              <Mail className="h-4 w-4 text-gray-400 shrink-0" /> 
              {vendorData.email}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-[14px] text-black font-bold">{t('Website')}</Label>
        {isEditing ? (
          <Input value={vendorData.website} onChange={(e) => setVendorData({...vendorData, website: e.target.value})} className="rounded-input h-10 border-gray-200 text-start" />
        ) : (
          <div className="font-normal text-[14px] text-gray-700 p-2.5 rounded-lg border border-gray-100/50 bg-gray-50/30 flex items-center gap-2 text-start">
            <Globe className="h-4 w-4 text-gray-400 shrink-0" /> 
            {vendorData.website}
          </div>
        )}
      </div>
    </div>
  </CardContent>
</Card>

              {/* Primary Contact Card */}
              <Card className="shadow-card border-none bg-white">
                <CardHeader className="px-6 pt-1 pb-0">
                  <CardTitle className="text-lg font-bold text-black">
                    {t('Primary Contact')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-4 pt-0">
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-1.5">
                      <Label className="text-[14px] text-black font-bold">{t('Name')}</Label>
                      {isEditing ? (
                        <Input value={vendorData.primaryContact.name} onChange={(e) => setVendorData({...vendorData, primaryContact: {...vendorData.primaryContact, name: e.target.value}})} className="rounded-input h-10 border-gray-200 text-start" />
                      ) : (
                        <div className="font-normal text-[14px] text-gray-700 p-2.5 rounded-lg border border-gray-100/50 bg-gray-50/30 text-start">{vendorData.primaryContact.name}</div>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[14px] text-black font-bold">{t('Job Title')}</Label>
                      {isEditing ? (
                        <Input value={vendorData.primaryContact.jobTitle} onChange={(e) => setVendorData({...vendorData, primaryContact: {...vendorData.primaryContact, jobTitle: e.target.value}})} className="rounded-input h-10 border-gray-200 text-start" />
                      ) : (
                        <div className="font-normal text-[14px] text-gray-700 p-2.5 rounded-lg border border-gray-100/50 bg-gray-50/30 flex items-center gap-2 text-start">
                          <Briefcase className="h-4 w-4 text-gray-400 shrink-0" />
                          {t(vendorData.primaryContact.jobTitle)}
                        </div>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[14px] text-black font-bold">{t('Mobile Number')}</Label>
                      {isEditing ? (
                        <Input value={vendorData.primaryContact.mobile} onChange={(e) => setVendorData({...vendorData, primaryContact: {...vendorData.primaryContact, mobile: e.target.value}})} className="rounded-input h-10 border-gray-200 text-start" />
                      ) : (
                        <div className="font-normal text-[14px] text-gray-700 p-2.5 rounded-lg border border-gray-100/50 bg-gray-50/30 flex items-center gap-2 text-start">
                          <Phone className="h-4 w-4 text-gray-400 shrink-0" />
                          {vendorData.primaryContact.mobile}
                        </div>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[14px] text-black font-bold">{t('Email')}</Label>
                      {isEditing ? (
                        <Input value={vendorData.primaryContact.email} onChange={(e) => setVendorData({...vendorData, primaryContact: {...vendorData.primaryContact, email: e.target.value}})} className="rounded-input h-10 border-gray-200 text-start" />
                      ) : (
                        <div className="font-normal text-[14px] text-gray-700 p-2.5 rounded-lg border border-gray-100/50 bg-gray-50/30 flex items-center gap-2 text-start">
                          <Mail className="h-4 w-4 text-gray-400 shrink-0" />
                          {vendorData.primaryContact.email}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Info Card */}
              <Card className="shadow-card border-none bg-white">
                <CardHeader className="px-6 pt-1 pb-0">
                  <CardTitle className="text-lg font-bold text-black">
                    {t('Financial Info')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-4 pt-0">
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label className="text-[14px] text-black font-bold">{t('Bank Name')}</Label>
                      {isEditing ? (
                        <Input value={vendorData.financialInfo.bankName} onChange={(e) => setVendorData({...vendorData, financialInfo: {...vendorData.financialInfo, bankName: e.target.value}})} className="rounded-input h-10 border-gray-200 text-start" />
                      ) : (
                        <div className="font-normal text-[14px] text-gray-700 p-2.5 rounded-lg border border-gray-100/50 bg-gray-50/30 text-start">{t(vendorData.financialInfo.bankName)}</div>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[14px] text-black font-bold">{t('Account Holder Name')}</Label>
                      {isEditing ? (
                        <Input value={vendorData.financialInfo.accountHolderName} onChange={(e) => setVendorData({...vendorData, financialInfo: {...vendorData.financialInfo, accountHolderName: e.target.value}})} className="rounded-input h-10 border-gray-200 text-start" />
                      ) : (
                        <div className="font-normal text-[14px] text-gray-700 p-2.5 rounded-lg border border-gray-100/50 bg-gray-50/30 text-start">{vendorData.financialInfo.accountHolderName}</div>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[14px] text-black font-bold">{t('IBAN')}</Label>
                      {isEditing ? (
                        <Input value={vendorData.financialInfo.bankAccount} onChange={(e) => setVendorData({...vendorData, financialInfo: {...vendorData.financialInfo, bankAccount: e.target.value}})} className="rounded-input h-10 border-gray-200 text-start" />
                      ) : (
                        <div className="font-mono text-[14px] text-gray-700 p-2.5 rounded-lg border border-gray-100/50 bg-gray-50/30 break-all text-start">{vendorData.financialInfo.bankAccount}</div>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[14px] text-black font-bold">{t('Swift Code')}</Label>
                      {isEditing ? (
                        <Input value={vendorData.financialInfo.swiftCode} onChange={(e) => setVendorData({...vendorData, financialInfo: {...vendorData.financialInfo, swiftCode: e.target.value}})} className="rounded-input h-10 border-gray-200 text-start" />
                      ) : (
                        <div className="font-normal text-[14px] text-gray-700 p-2.5 rounded-lg border border-gray-100/50 bg-gray-50/30 text-start">{vendorData.financialInfo.swiftCode}</div>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[14px] text-black font-bold">{t('VAT Registration Number')}</Label>
                      {isEditing ? (
                        <Input value={vendorData.financialInfo.vatNumber} onChange={(e) => setVendorData({...vendorData, financialInfo: {...vendorData.financialInfo, vatNumber: e.target.value}})} className="rounded-input h-10 border-gray-200 text-start" />
                      ) : (
                        <div className="font-normal text-[14px] text-gray-700 p-2.5 rounded-lg border border-gray-100/50 bg-gray-50/30 text-start">{vendorData.financialInfo.vatNumber}</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

{/* Service Categories Card */}
<Card className="shadow-card border-none bg-white">
  <CardHeader className="pb-0 px-6 pt-1">
    <CardTitle className="text-lg font-bold text-black">{t('Service Categories')}</CardTitle>
  </CardHeader>
  <CardContent className="pt-0 space-y-2">
    {isEditing ? (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 text-start">
        {availableCategories.map(category => (
          <div key={category} className="flex items-center space-x-2.5 rtl:space-x-reverse p-2 rounded-lg hover:bg-gray-50/60 transition-colors">
            <input
              type="checkbox"
              id={category}
              checked={vendorData.categories.includes(category)}
              onChange={() => handleCategoryToggle(category)}
              className="h-4 w-4 rounded-[4px] border-gray-300 text-[var(--fnrc-primary-green)] focus:ring-[var(--fnrc-primary-green)]/50 cursor-pointer"
            />
            <label htmlFor={category} className="text-xs font-semibold text-gray-600 leading-none cursor-pointer">
              {t(category)}
            </label>
          </div>
        ))}
      </div>
    ) : (
      <div className="flex flex-wrap gap-2 pt-1">
        {vendorData.categories.map(category => (
          <Badge key={category} variant="secondary" className="bg-[var(--fnrc-primary-green)]/5 border border-[var(--fnrc-primary-green)]/15 text-[var(--fnrc-primary-green)] font-semibold text-xs px-3 py-1 rounded-full shadow-2xs">
            {t(category)}
          </Badge>
        ))}
      </div>
    )}
  </CardContent>
</Card>
        

          {/* Compliance Documents Section */}
          <Card className="shadow-card border-none bg-white">
            <CardHeader className="px-6 pt-1 pb-0">
              <div className="flex items-center justify-between gap-4">
                <CardTitle className="text-lg font-bold text-black text-start">{t('Vendor Documents')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold text-[13px] text-gray-400 text-start">{t('Document Name')}</TableHead>
                    
                    <TableHead className="font-bold text-[13px] text-gray-400 text-start">{t('Upload Date')}</TableHead>
                    <TableHead className="font-bold text-[13px] text-gray-400 text-start">{t('Issue Date')}</TableHead>
                    <TableHead className="font-bold text-[13px] text-gray-400 text-start">{t('Expiry Date')}</TableHead>
                    <TableHead className="font-bold text-[13px] text-gray-400 text-start">{t('Verification Status')}</TableHead>
                    <TableHead className="text-end font-bold text-[13px] text-gray-400 pe-6">{t('Actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="text-start">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-gray-400 shrink-0" />
                          <div>
                            <div className="font-semibold text-gray-800 text-[14px]">{t(doc.name)}</div>
                            <div className="text-[11px] text-red-500 font-medium">
                              {doc.expiryDate 
                                ? (() => {
                                    const days = getExpiryDays(doc.expiryDate);
                                    if (days === null) return null;
                                    if (days < 0) return `${t('Expired')} ${Math.abs(days)} ${t('days ago')}`;
                                    return `${t('Document Expiry in')} ${days} ${t('Days')}`;
                                  })()
                                : null}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell className="text-[14px] text-gray-500 font-medium text-start">
                        {new Date(doc.uploadDate).toLocaleDateString(language === 'ar' ? 'ar-AE' : 'en-GB')}
                      </TableCell>
                      <TableCell className="text-[14px] text-gray-500 font-medium text-start">
                        {new Date(doc.issueDate).toLocaleDateString(language === 'ar' ? 'ar-AE' : 'en-GB')}
                      </TableCell>
                      <TableCell className="text-[14px] text-gray-500 font-medium text-start">
                        {doc.expiryDate ? new Date(doc.expiryDate).toLocaleDateString(language === 'ar' ? 'ar-AE' : 'en-GB') : '-'}
                      </TableCell>
                      <TableCell className="text-start">
                        <div className="flex items-center gap-2">
                          <StatusBadge status={doc.status} />
                        </div>
                      </TableCell>
                      <TableCell className="text-end pe-6">
                        <div className="flex justify-end gap-1">
                          {(() => {
                            const daysRemaining = getExpiryDays(doc.expiryDate);
                            const isNotVerified = ['not verified', 'not_verified', 'rejected'].includes((doc.status || '').toLowerCase());
                            const isExpired = daysRemaining !== null && daysRemaining < 0;
                            if (isNotVerified || isExpired) {
                              return (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button size="sm" variant="ghost" onClick={() => {
                                        setDocumentToUpload(doc);
                                        setUploadIssueDate(doc.issueDate || '');
                                        setUploadExpiryDate(doc.expiryDate || '');
                                        setUploadFile(null);
                                        setIsUploadModalOpen(true);
                                      }} className="h-8 w-8 p-0 rounded-full hover:bg-blue-50 flex items-center justify-center text-blue-500 cursor-pointer">
                                        <Upload className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="text-xs font-bold">{t('Upload Replacement')}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              );
                            }
                            return null;
                          })()}
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Detailed Activity Log Card */}
          <Card className="shadow-card border-none bg-white">
            <CardHeader className="px-6 pt-5 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <CardTitle className="text-lg font-bold text-black text-start">{t('Detailed Activity Log')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0">
              <div className="rounded-lg border border-gray-200 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#F8FAFC] border-b border-gray-200">
                      <TableHead className="font-semibold text-gray-900 text-sm py-4 px-6 text-start w-[220px]">{t('Action')}</TableHead>
                      <TableHead className="font-semibold text-gray-900 text-sm py-4 px-6 text-start w-[180px]">{t('Role')}</TableHead>
                      <TableHead className="font-semibold text-gray-900 text-sm py-4 px-6 text-start w-[180px]">{t('Date & Time')}</TableHead>
                      <TableHead className="font-semibold text-gray-900 text-sm py-4 px-6 text-start">{t('Remarks')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        action: 'Profile Approved',
                        performedBy: 'Super Admin',
                        dateTime: '15/02/2026 - 11:20 AM',
                        remarks: 'All document corrections are verified and compliant. Vendor profile fully approved.'
                      },
                      {
                        action: 'Resubmitted for Review',
                        performedBy: 'Vendor',
                        dateTime: '14/02/2026 - 09:45 AM',
                        remarks: 'Uploaded readable Trade License copy and updated Swift Code.'
                      },
                      {
                        action: 'Correction Requested',
                        performedBy: 'Super Admin',
                        dateTime: '12/02/2026 - 04:30 PM',
                        remarks: 'Trade license file is unreadable. Swift Code is missing in bank details. Please correct.'
                      },
                      {
                        action: 'Onboarding Submitted',
                        performedBy: 'Vendor',
                        dateTime: '10/02/2026 - 02:15 PM',
                        remarks: 'Registration form submitted with basic company profiles and compliance documents.'
                      }
                    ].map((log, idx) => (
                      <TableRow key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/30 transition-colors">
                        <TableCell className="text-start font-medium text-gray-900 text-sm py-4 px-6">
                           {t(log.action)}
                        </TableCell>
                        <TableCell className="text-start font-normal text-gray-600 text-sm py-4 px-6">
                           {t(log.performedBy)}
                        </TableCell>
                        <TableCell className="text-start text-gray-500 font-normal text-sm py-4 px-6">
                           {log.dateTime}
                        </TableCell>
                        <TableCell className="text-start text-gray-600 text-sm py-4 px-6 leading-relaxed">
                           {t(log.remarks)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          </div>
        </TabsContent>

        {/* --- CHANGE PASSWORD TAB --- */}
        <TabsContent value="security" className="mt-6 focus-visible:outline-none">
          <Card className="max-w-2xl mx-auto shadow-card border-none bg-white">
            <CardHeader className="px-6 pt-1 pb-0">
              <CardTitle className="text-lg font-bold text-black text-start">
                {t('Change Password')}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-4 space-y-5 pt-0 text-start">
              <div className="space-y-2">
                <Label htmlFor="current-password">{t('Current Password')}</Label>
                <Input id="current-password" type="password" placeholder={t('Enter current password')} className="rounded-input h-10 border-gray-200 text-start" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">{t('New Password')}</Label>
                <Input id="new-password" type="password" placeholder={t('Enter new password')} className="rounded-input h-10 border-gray-200 text-start" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">{t('Re-enter New Password')}</Label>
                <Input id="confirm-password" type="password" placeholder={t('Confirm new password')} className="rounded-input h-10 border-gray-200 text-start" />
              </div>
              
              <div className="pt-3 flex justify-end gap-3">
                <Button variant="outline" className="rounded-button text-xs font-semibold h-9 px-4 cursor-pointer">{t('Reset Form')}</Button>
                <Button className="bg-[var(--fnrc-primary-green)] hover:bg-[var(--fnrc-primary-green)]/90 text-white rounded-button text-xs font-semibold h-9 px-4 shadow-sm cursor-pointer">
                  {t('Update Password')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="text-start text-lg font-bold">{t('Upload Document')}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-5 py-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="file" className="text-start font-bold w-[110px] shrink-0 whitespace-nowrap">
                {t('Document File')}
              </Label>
              <Input
                id="file"
                type="file"
                className="cursor-pointer text-start flex-1"
                onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
              />
            </div>
            <div className="flex items-center gap-4">
              <Label htmlFor="issue-date" className="text-start font-bold w-[110px] shrink-0 whitespace-nowrap">
                {t('Issue Date')}
              </Label>
              <Input
                id="issue-date"
                type="date"
                className="text-start flex-1 [&::-webkit-calendar-picker-indicator]:ml-auto"
                value={uploadIssueDate}
                onChange={(e) => setUploadIssueDate(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <Label htmlFor="expiry-date" className="text-start font-bold w-[110px] shrink-0 whitespace-nowrap">
                {t('Expiry Date')}
              </Label>
              <Input
                id="expiry-date"
                type="date"
                className="text-start flex-1 [&::-webkit-calendar-picker-indicator]:ml-auto"
                value={uploadExpiryDate}
                onChange={(e) => setUploadExpiryDate(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-3 mt-2">
            <Button variant="outline" onClick={() => setIsUploadModalOpen(false)} className="cursor-pointer rounded-button font-semibold h-10 px-4">
              {t('Cancel')}
            </Button>
            <Button type="button" onClick={handleUploadDocument} disabled={!uploadFile} className="bg-[var(--fnrc-primary-green)] hover:bg-[var(--fnrc-primary-green)]/90 text-white shadow-sm cursor-pointer rounded-button font-semibold h-10 px-6">
              {t('Upload')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}