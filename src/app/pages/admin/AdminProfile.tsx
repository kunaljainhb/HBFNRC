import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Eye, EyeOff, User, Lock, Info, KeyRound } from 'lucide-react';
import { useTranslation } from '@/app/context/LanguageContext';

export default function AdminProfile() {
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = useState('personal');
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isRtl = language === 'ar';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">{t('My Profile')}</h1>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px] mb-6">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {t('Personal Information')}
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            {t('Change Password')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card className="border-gray-200 shadow-sm gap-0 h-fit">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-3">
              <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <User className="h-5 w-5 text-[var(--fnrc-primary-green)]" />
                {t('Personal Information')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5 pb-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-600 font-medium">{t('Full Name')}</Label>
                  <Input value="Ahmed Al Mansoori" readOnly disabled className="bg-gray-50 text-gray-700 cursor-not-allowed" />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-600 font-medium">{t('Employee Code')}</Label>
                  <Input value="EMP00125" readOnly disabled className="bg-gray-50 text-gray-700 cursor-not-allowed" />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-600 font-medium">{t('Email Address')}</Label>
                  <Input value="ahmed@fnrc.gov.ae" readOnly disabled className="bg-gray-50 text-gray-700 cursor-not-allowed" />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-600 font-medium">{t('Role')}</Label>
                  <Input value="Procurement Manager" readOnly disabled className="bg-gray-50 text-gray-700 cursor-not-allowed" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="border-gray-200 shadow-sm gap-0 h-fit max-w-2xl">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-3">
              <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <KeyRound className="h-5 w-5 text-[var(--fnrc-primary-green)]" />
                {t('Change Password')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5 pb-5">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">{t('Current Password')}</Label>
                  <div className="relative">
                    <Input type={showCurrentPassword ? "text" : "password"} placeholder="••••••••" className={isRtl ? "pl-10" : "pr-10"} />
                    <button 
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className={`absolute inset-y-0 ${isRtl ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center text-gray-400 hover:text-gray-600`}
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">{t('New Password')}</Label>
                  <div className="relative">
                    <Input type={showNewPassword ? "text" : "password"} placeholder="••••••••" className={isRtl ? "pl-10" : "pr-10"} />
                    <button 
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className={`absolute inset-y-0 ${isRtl ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center text-gray-400 hover:text-gray-600`}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">{t('Confirm New Password')}</Label>
                  <div className="relative">
                    <Input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" className={isRtl ? "pl-10" : "pr-10"} />
                    <button 
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className={`absolute inset-y-0 ${isRtl ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center text-gray-400 hover:text-gray-600`}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50/50 border-t border-gray-100 flex justify-end gap-3 pt-4 pb-4">
              <Button variant="outline" className="min-w-[100px]">{t('Cancel')}</Button>
              <Button style={{ backgroundColor: 'var(--fnrc-primary-green)' }} className="min-w-[140px] text-white hover:opacity-90">{t('Change Password')}</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
