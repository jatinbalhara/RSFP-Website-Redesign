import Image from "next/image";
import Link from "next/link";
import { site } from "@/site.config";
import { generalEnquiry, waLink } from "@/lib/whatsapp";
import { MountainLine } from "./MountainLine";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

export function Footer() {
  const a = site.contact.address;
  const socials = Object.entries(site.social).filter(([, url]) => url);
  return (
    <footer className="site-footer">
      <MountainLine />
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <span className="logo-pill">
            <Image src="/images/logo.png" alt={site.brand} width={976} height={830} className="logo" />
          </span>
          <p className="note">Packed with love in Sanet ✿</p>
        </div>
        <div>
          <h2 className="footer-h">Talk to us</h2>
          <ul className="plain">
            <li>
              <a href={waLink(generalEnquiry())} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={16} /> WhatsApp {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`tel:${site.contact.phoneTel}`}>
                <PhoneIcon size={15} /> Call {site.contact.phoneDisplay}
              </a>
            </li>
            {site.contact.email && (
              <li>
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              </li>
            )}
            <li className="muted">{site.contact.hours}</li>
          </ul>
        </div>
        <div>
          <h2 className="footer-h">Find us</h2>
          <address>
            {a.line1}
            <br />
            {a.line2}
            <br />
            {a.district}, {a.state}
            {a.pin && ` ${a.pin}`}
          </address>
        </div>
        <div>
          <h2 className="footer-h">Browse</h2>
          <ul className="plain">
            <li><Link href="/shop">All products</Link></li>
            <li><Link href="/shop?c=pickles">Pickles</Link></li>
            <li><Link href="/shop?c=sharbat">Squash &amp; sharbat</Link></li>
            <li><Link href="/our-story">Our story</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
          {socials.length > 0 && (
            <p className="socials">
              {socials.map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer">
                  {name}
                </a>
              ))}
            </p>
          )}
        </div>
      </div>
      <div className="wrap footer-base">
        <span>FSSAI Lic. No. {site.fssai}</span>
        <span>
          © {new Date().getFullYear()} {site.company}. Made by {site.founder} &amp; the women of Sanet.
        </span>
      </div>
    </footer>
  );
}
