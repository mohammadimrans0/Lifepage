import Settingbar from "@/components/layout/SettingBar";


export const metadata = {
    title: 'Settings',
  };
  
  export default function SettingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="m-auto">
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 lg:col-span-3"><Settingbar/></div>
            <div className="col-span-4 lg:col-span-9">{children}</div>
          </div>
        </div>
    );
  }