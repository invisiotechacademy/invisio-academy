import MainLayout from "../components/layouts/main-layout";

import CertificateCard from "../components/certificate-card";

import CertificateDownload from "../components/certificate-download";

export default function CertificatePage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-black p-10 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex justify-end">
            <CertificateDownload />
          </div>

          <div id="certificate">
            <CertificateCard
              studentName="John Doe"
              courseName="React Masterclass"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}