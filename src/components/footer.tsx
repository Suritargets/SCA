import Link from "next/link";
import { CtaBanner } from "@/components/cta-banner";

export function Footer() {
  return (
    <footer>
      <CtaBanner />

      {/* Footer */}
      <div className="bg-sca-footer text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-bold">
              Forms your Future<br />in Accounting<br />&amp; Finance
            </h3>
            <ul className="space-y-1 text-sm opacity-90">
              <li>Henck Arronstraat 134</li>
              <li>Paramaribo, Suriname</li>
              <li>South-America</li>
              <li className="pt-2">(t) 597- 425 766</li>
              <li>(m) 597 – 7156302</li>
              <li className="pt-2">
                (e){" "}
                <a
                  href="mailto:info@surinamecollegeofaccountancy.com"
                  className="font-bold hover:underline"
                >
                  E-Mail us
                </a>
              </li>
              <li className="pt-2">Office hours:</li>
              <li>Mon. – Fri. 8:00 – 12:00</li>
              <li>Sat. 9:00 – 12:00</li>
            </ul>
          </div>

          {/* SCA Menu */}
          <div>
            <h3 className="mb-1 text-lg font-bold">SCA Menu</h3>
            <hr className="mb-4 border-white/40" />
            <ul className="space-y-2 text-sm opacity-90">
              <li><Link href="/about" className="hover:underline">About us</Link></li>
              <li><Link href="/news" className="hover:underline">News</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact us</Link></li>
              <li>
                <a
                  href="https://forms.accaglobal.com/contact-us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Contact ACCA
                </a>
              </li>
              <li><Link href="/terms" className="hover:underline">Terms of use</Link></li>
              <li><Link href="/complaints" className="hover:underline">Complaints Form</Link></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="mb-1 text-lg font-bold">Courses</h3>
            <hr className="mb-4 border-white/40" />
            <ul className="space-y-2 text-sm opacity-90">
              <li><Link href="/courses/cat" className="hover:underline">Certified Accounting Technician (CAT)</Link></li>
              <li><Link href="/courses/acca-qualification" className="hover:underline">Association of Chartered Certified Accountants (ACCA)</Link></li>
              <li><Link href="/courses/qc" className="hover:underline">Qualified Controller (QC)</Link></li>
              <li><Link href="/courses/qt" className="hover:underline">Qualified Treasurer (QT)</Link></li>
              <li><Link href="/courses/cisa" className="hover:underline">Certified Information Systems Auditor (CISA)</Link></li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a href="https://www.facebook.com/profile.php?id=100063838680023#" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="flex items-center gap-1.5 rounded bg-blue-600 px-3 py-1.5 text-xs font-semibold hover:bg-blue-700">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </a>
              <a href="https://www.instagram.com/surinamecollegeofaccountancy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="flex items-center gap-1.5 rounded bg-pink-600 px-3 py-1.5 text-xs font-semibold hover:bg-pink-700">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 py-4 text-center text-xs opacity-70">
          &copy; {new Date().getFullYear()} Suriname College of Accountancy. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
