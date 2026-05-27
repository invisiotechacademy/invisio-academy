import jsPDF from "jspdf";

import html2canvas from "html2canvas";

export default function CertificateDownload() {
  async function downloadPDF() {
    const input =
      document.getElementById(
        "certificate"
      );

    if (!input) return;

    const canvas =
      await html2canvas(
        input
      );

    const imgData =
      canvas.toDataURL(
        "image/png"
      );

    const pdf =
      new jsPDF(
        "landscape"
      );

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      297,
      210
    );

    pdf.save(
      "certificate.pdf"
    );
  }

  return (
    <button
      onClick={downloadPDF}
      className="rounded-2xl bg-white px-8 py-5 text-xl font-bold text-black"
    >
      Download PDF
    </button>
  );
}