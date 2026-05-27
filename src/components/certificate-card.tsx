type Props = {
  studentName: string;

  courseName: string;
};

export default function CertificateCard({
  studentName,
  courseName,
}: Props) {
  return (
    <div className="rounded-[40px] border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-black p-16 text-center text-white">
      <p className="text-xl text-yellow-400">
        CERTIFICATE
      </p>

      <h1 className="mt-6 text-7xl font-black">
        Achievement Award
      </h1>

      <p className="mt-12 text-2xl text-zinc-400">
        This certifies that
      </p>

      <h2 className="mt-6 text-6xl font-black">
        {studentName}
      </h2>

      <p className="mt-12 text-2xl text-zinc-400">
        successfully completed
      </p>

      <h3 className="mt-6 text-5xl font-bold">
        {courseName}
      </h3>

      <div className="mt-16 flex items-center justify-center gap-10">
        <div>
          <p className="text-zinc-500">
            Platform
          </p>

          <h4 className="mt-3 text-2xl font-bold">
            LMS PRO
          </h4>
        </div>

        <div>
          <p className="text-zinc-500">
            Status
          </p>

          <h4 className="mt-3 text-2xl font-bold text-green-400">
            VERIFIED
          </h4>
        </div>
      </div>
    </div>
  );
}