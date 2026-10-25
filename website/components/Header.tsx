import Image from "next/image";
import Link from "next/link";
import { site } from "@/site.config";
import { generalEnquiry, waLink } from "@/lib/whatsapp";
import { BasketLink } from "./BasketLink";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/our-story", label: "Our story" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="topbar">
        <div className="wrap topbar-inner">
          <span className="topbar-note">Handmade in small batches in Sanet, Himachal</span>
          <span className="topbar-contact">
            <a href={`tel:${site.contact.phoneTel}`}>
              <PhoneIcon size={14} /> {site.contact.phoneDisplay}
            </a>
            <a href={waLink(generalEnquiry())} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={15} /> WhatsApp
            </a>
          </span>
        </div>
      </div>
      <div className="wrap header-inner">
        <Link href="/" className="logo-link" aria-label={`${site.brand}, home`}>
          <Image src="/images/logo.png" alt={site.brand} width={976} height={830} priority className="logo" />
        </Link>
        <nav aria-label="Main" className="main-nav">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <a className="btn btn-wa btn-sm header-wa" href={waLink(generalEnquiry())} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={18} /> <span>Ask Neelam ji</span>
          </a>
          <BasketLink />
        </div>
      </div>
      <nav aria-label="Main (mobile)" className="mobile-nav wrap">
        {nav.map((n) => (
          <Link key={n.href} href={n.href}>
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
