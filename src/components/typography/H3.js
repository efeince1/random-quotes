export function H3({ element, children }) {
  const styles = 'text-xl sm:text-2xl font-semibold text-foreground';

  switch (element) {
    case 'p':
      return <p className={styles}>{children}</p>;
    case 'span':
      return <span className={styles}>{children}</span>;
    default:
      return <h3 className={styles}>{children}</h3>;
  }
}