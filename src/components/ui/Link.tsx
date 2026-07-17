import * as React from "react";

export function navigate(href: string) {
  window.history.pushState({}, "", href);
  const popStateEvent = new PopStateEvent("popstate");
  window.dispatchEvent(popStateEvent);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
  target?: string;
  rel?: string;
  style?: React.CSSProperties;
  title?: string;
  key?: string | number | null;
}

export function Link({ href, children, onClick, className, ...props }: LinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Let standard browser behaviors happen (e.g. command/control click for new tab)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    
    e.preventDefault();
    if (onClick) {
      onClick(e);
    }
    navigate(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
