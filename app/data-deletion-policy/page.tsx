import LegalPage from "@/components/LegalPage";
import { DELETION } from "@/lib/legal";

export const metadata = { title: DELETION.title };

export default function Page() {
  return <LegalPage doc={DELETION} />;
}
