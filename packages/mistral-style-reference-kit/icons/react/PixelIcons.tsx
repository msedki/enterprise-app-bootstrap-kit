import * as React from 'react';

export type PixelIconProps = React.SVGProps<SVGSVGElement> & { title?: string };

function makeIcon(body: React.ReactNode, displayName: string) {
  const Icon = React.forwardRef<SVGSVGElement, PixelIconProps>(({ title, ...props }, ref) => (
    <svg ref={ref} viewBox="0 0 24 24" fill="currentColor" aria-hidden={title ? undefined : true} role={title ? 'img' : undefined} {...props}>
      {title ? <title>{title}</title> : null}
      {body}
    </svg>
  ));
  Icon.displayName = displayName;
  return Icon;
}

export const ArrowRightIcon = makeIcon(<><path d="M3 10h12V7h3v3h3v4h-3v3h-3v-3H3z"/></>, 'ArrowRightIcon');
export const ArrowLeftIcon = makeIcon(<><path d="M21 10H9V7H6v3H3v4h3v3h3v-3h12z"/></>, 'ArrowLeftIcon');
export const ChevronRightIcon = makeIcon(<><path d="M8 5h4v3h3v3h3v3h-3v3h-3v3H8v-3h3v-3h3v-3h-3V8H8z"/></>, 'ChevronRightIcon');
export const ChevronDownIcon = makeIcon(<><path d="M5 8h3v3h3v3h2v-3h3V8h3v6h-3v3h-3v3h-2v-3H8v-3H5z"/></>, 'ChevronDownIcon');
export const CheckIcon = makeIcon(<><path d="M3 11h4v4h3v3h3v-3h3v-3h3V9h3v6h-3v3h-3v3H9v-3H6v-3H3z"/></>, 'CheckIcon');
export const CopyIcon = makeIcon(<><path fillRule="evenodd" d="M7 3h11v4h3v14H10v-4H7zm6 7h5v8h-5zm-10-4h11v3H6v8h3v3H3z" clipRule="evenodd"/></>, 'CopyIcon');
export const SearchIcon = makeIcon(<><path fillRule="evenodd" d="M4 4h12v3h3v9h-3v3H4v-3H1V7h3zm3 3h6v3h3v3h-3v3H7v-3H4v-3h3zm9 9h3v3h3v3h-4v-3h-2z" clipRule="evenodd"/></>, 'SearchIcon');
export const MenuIcon = makeIcon(<><path d="M3 5h18v3H3zm0 6h18v3H3zm0 6h18v3H3z"/></>, 'MenuIcon');
export const CloseIcon = makeIcon(<><path d="M4 4h4v4h3v3h2V8h3V4h4v4h-3v3h-3v2h3v3h3v4h-4v-4h-3v-3h-2v3H8v4H4v-4h3v-3h3v-2H7V8H4z"/></>, 'CloseIcon');
export const HomeIcon = makeIcon(<><path d="M9 3h6v3h3v3h3v12h-7v-6h-4v6H3V9h3V6h3zm0 3v3H6v9h2v-6h8v6h2V9h-3V6z"/></>, 'HomeIcon');
export const PageIcon = makeIcon(<><path fillRule="evenodd" d="M4 2h11v3h3v3h3v14H4zm4 4v12h9V9h-5V6zm7 0v3h3zM9 11h6v2H9zm0 4h6v2H9z" clipRule="evenodd"/></>, 'PageIcon');
export const UserIcon = makeIcon(<><path d="M8 3h8v3h3v6h-3v3H8v-3H5V6h3zm2 3v6h4V6zM5 17h14v3h3v2H2v-2h3z"/></>, 'UserIcon');
export const SettingsIcon = makeIcon(<><path fillRule="evenodd" d="M9 2h6v3h3v3h3v8h-3v3h-3v3H9v-3H6v-3H3V8h3V5h3zm1 6h4v3h3v2h-3v3h-4v-3H7v-2h3z" clipRule="evenodd"/></>, 'SettingsIcon');
export const ShieldIcon = makeIcon(<><path fillRule="evenodd" d="M4 3h16v14h-3v3h-3v2h-4v-2H7v-3H4zm4 4v8h2v2h4v-2h2V7zm1 3h3v3h3v2h-6z" clipRule="evenodd"/></>, 'ShieldIcon');
export const BellIcon = makeIcon(<><path d="M9 2h6v3h3v3h2v8h2v3H2v-3h2V8h2V5h3zm0 4v2H7v8h10V8h-2V6zm0 14h6v2H9z"/></>, 'BellIcon');
export const ClockIcon = makeIcon(<><path fillRule="evenodd" d="M6 3h12v3h3v12h-3v3H6v-3H3V6h3zm3 3H6v12h12V6h-6v7h4v3H9z" clipRule="evenodd"/></>, 'ClockIcon');
export const FilterIcon = makeIcon(<><path d="M3 4h18v3h-3v3h-3v3h-2v8H9v-8H6v-3H3z"/></>, 'FilterIcon');
export const DownloadIcon = makeIcon(<><path d="M10 2h4v10h3V9h3v6h-3v3h-3v3h-4v-3H7v-3H4V9h3v3h3zM3 20h18v2H3z"/></>, 'DownloadIcon');
export const UploadIcon = makeIcon(<><path d="M10 22h4V12h3v3h3V9h-3V6h-3V3h-4v3H7v3H4v6h3v-3h3zM3 2h18v2H3z"/></>, 'UploadIcon');
export const ChartIcon = makeIcon(<><path d="M3 19h18v3H3zm2-8h4v7H5zm6-6h4v13h-4zm6 3h4v10h-4z"/></>, 'ChartIcon');
export const PlusIcon = makeIcon(<><path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z"/></>, 'PlusIcon');
export const MinusIcon = makeIcon(<><path d="M3 10h18v4H3z"/></>, 'MinusIcon');
export const ExternalIcon = makeIcon(<><path d="M4 4h8v3H7v10h10v-5h3v8H4zM14 3h7v7h-3V8l-7 7-2-2 7-7h-2z"/></>, 'ExternalIcon');
export const CommandIcon = makeIcon(<><path fillRule="evenodd" d="M3 3h7v5H8V6H6v2h2v3H3zm11 0h7v8h-5V8h2V6h-2v2h-2zm2 10h5v8h-7v-5h2v2h2v-2h-2zM3 13h5v3h2v5H3zm3 3v2h2v-2z" clipRule="evenodd"/></>, 'CommandIcon');
