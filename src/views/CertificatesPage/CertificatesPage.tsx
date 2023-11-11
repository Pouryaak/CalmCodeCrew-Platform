import CertificateList from '../../features/Certificates/components/CertificateList/CertificateList';
import PageHeader from '../../shared/components/PageHeader/PageHeader';

const CertificatesPage = () => {
  return (
    <>
      <PageHeader title="Certificates" />
      <CertificateList />
    </>
  );
};

export default CertificatesPage;
