import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';
import { toast } from 'sonner';
import { useTranslation } from '@/app/context/LanguageContext';

export default function AdminConfig() {
  const { t } = useTranslation();

  const handleUpdate = (section: string) => {
    toast.success(t(`${section} updated successfully`));
  };

  return (
    <div className="space-y-8 font-sans pb-12 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {t('System Configuration')}
          </h1>
        </div>
      </div>

      {/* SMS Configuration */}
      <Card className="border border-gray-100/50 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-gray-50 pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-900">
            {t('SMS Configuration')}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="smsApiUrl" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                {t('API Base URL *')}
              </Label>
              <Input id="smsApiUrl" defaultValue="https://api.example-sms.com:8080" className="rounded-xl border-gray-200 h-10 w-full text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smsSenderId" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                {t('Sender ID *')}
              </Label>
              <Input id="smsSenderId" defaultValue="MY_COMPANY" className="rounded-xl border-gray-200 h-10 w-full text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smsUsername" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                {t('Username *')}
              </Label>
              <Input id="smsUsername" defaultValue="api_user_89" className="rounded-xl border-gray-200 h-10 w-full text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smsPassword" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                {t('Password *')}
              </Label>
              <Input id="smsPassword" type="password" defaultValue="rand0m#Pass123" className="rounded-xl border-gray-200 h-10 w-full text-sm" />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button
              onClick={() => handleUpdate('SMS Configuration')}
              className="text-white h-10 px-6 font-semibold shadow-md shadow-[var(--fnrc-primary-green)]/15 transition-all hover:shadow-lg hover:-translate-y-0.5 rounded-lg"
              style={{ backgroundColor: 'var(--fnrc-primary-green)' }}
            >
              {t('Update')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Email Configuration */}
      <Card className="border border-gray-100/50 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-gray-50 pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-900">
            {t('Email Configuration')}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="emailUrl" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                {t('SMTP Host / Server *')}
              </Label>
              <Input id="emailUrl" defaultValue="smtp.office365.com" className="rounded-xl border-gray-200 h-10 w-full text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emailPort" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                {t('SMTP Port *')}
              </Label>
              <Input id="emailPort" defaultValue="587" className="rounded-xl border-gray-200 h-10 w-full text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emailUser" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                {t('SMTP Username / Email *')}
              </Label>
              <Input id="emailUser" defaultValue="Vendors@fnrcgov.onmicrosoft.com" className="rounded-xl border-gray-200 h-10 w-full text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emailPass" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                {t('SMTP Password *')}
              </Label>
              <Input id="emailPass" type="password" defaultValue="Ve@fnrc#2050#$33" className="rounded-xl border-gray-200 h-10 w-full text-sm" />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button
              onClick={() => handleUpdate('Email Configuration')}
              className="text-white h-10 px-6 font-semibold shadow-md shadow-[var(--fnrc-primary-green)]/15 transition-all hover:shadow-lg hover:-translate-y-0.5 rounded-lg"
              style={{ backgroundColor: 'var(--fnrc-primary-green)' }}
            >
              {t('Update')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Configuration */}
      <Card className="border border-gray-100/50 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-gray-50 pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-900">
            {t('AI Configuration')}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="aiUrl" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                {t('AI Endpoint *')}
              </Label>
              <Input id="aiUrl" defaultValue="https://kanqopenai.cognitiveservices.azure.com/" className="rounded-xl border-gray-200 h-10 w-full text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aiAccountDetails" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                {t('AI API Key *')}
              </Label>
              <Input id="aiAccountDetails" type="password" defaultValue="sk-..." className="rounded-xl border-gray-200 h-10 w-full text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aiDeploymentName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                {t('AI Deployment Name *')}
              </Label>
              <Input id="aiDeploymentName" defaultValue="gpt-4-mini" className="rounded-xl border-gray-200 h-10 w-full text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aiMaxTokens" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                {t('AI Max Output Token Count *')}
              </Label>
              <Input id="aiMaxTokens" type="number" defaultValue="15000" className="rounded-xl border-gray-200 h-10 w-full text-sm" />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button
              onClick={() => handleUpdate('AI Configuration')}
              className="text-white h-10 px-6 font-semibold shadow-md shadow-[var(--fnrc-primary-green)]/15 transition-all hover:shadow-lg hover:-translate-y-0.5 rounded-lg"
              style={{ backgroundColor: 'var(--fnrc-primary-green)' }}
            >
              {t('Update')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* UAE Pass Configuration */}
      <Card className="border border-gray-100/50 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-gray-50 pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-900">
            {t('UAE Pass Configuration')}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="uaePassUrl" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                {t('UAE Pass URL *')}
              </Label>
              <Input id="uaePassUrl" defaultValue="https://stg-id.uaepass.ae/idshub/authorize" className="rounded-xl border-gray-200 h-10 w-full text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="uaePassClientId" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                {t('Client ID *')}
              </Label>
              <Input id="uaePassClientId" defaultValue="sandbox_stage" className="rounded-xl border-gray-200 h-10 w-full text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="uaePassCred" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                {t('Client Secret *')}
              </Label>
              <Input id="uaePassCred" type="password" defaultValue="secret_uae" className="rounded-xl border-gray-200 h-10 w-full text-sm" />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button
              onClick={() => handleUpdate('UAE Pass Configuration')}
              className="text-white h-10 px-6 font-semibold shadow-md shadow-[var(--fnrc-primary-green)]/15 transition-all hover:shadow-lg hover:-translate-y-0.5 rounded-lg"
              style={{ backgroundColor: 'var(--fnrc-primary-green)' }}
            >
              {t('Update')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Application Settings */}
      <Card className="border border-gray-100/50 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-gray-50 pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-900">
            {t('Application Settings')}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="docExpiry" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                {t('Document Expiry Threshold (Days) *')}
              </Label>
              <Input id="docExpiry" type="number" defaultValue="30" className="rounded-xl border-gray-200 h-10 w-full text-sm" />
              <p className="text-xs text-gray-400 font-medium leading-relaxed mt-1">
                {t('Days before expiry to trigger alerts')}
              </p>
            </div>
            
            <div className="space-y-2 flex flex-col justify-start">
              <Label htmlFor="aiToggle" className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                {t('AI Features')}
              </Label>
              <div className="flex items-center justify-between space-x-3 bg-gray-50/50 p-3 rounded-lg border border-gray-100">
                <Label htmlFor="aiToggle" className="text-sm text-gray-700 font-medium cursor-pointer">
                  {t('Enable AI assistance across application')}
                </Label>
                <Switch id="aiToggle" defaultChecked />
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button
              onClick={() => handleUpdate('Application Settings')}
              className="text-white h-10 px-6 font-semibold shadow-md shadow-[var(--fnrc-primary-green)]/15 transition-all hover:shadow-lg hover:-translate-y-0.5 rounded-lg"
              style={{ backgroundColor: 'var(--fnrc-primary-green)' }}
            >
              {t('Update')}
            </Button>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
