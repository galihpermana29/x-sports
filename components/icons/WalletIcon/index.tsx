import React, { SVGAttributes } from 'react';

function WalletIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="26"
      height="22"
      viewBox="0 0 26 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M23.8237 4H3.82373C3.55851 4 3.30416 3.89464 3.11662 3.70711C2.92909 3.51957 2.82373 3.26522 2.82373 3C2.82373 2.73478 2.92909 2.48043 3.11662 2.29289C3.30416 2.10536 3.55851 2 3.82373 2H20.8237C21.0889 2 21.3433 1.89464 21.5308 1.70711C21.7184 1.51957 21.8237 1.26522 21.8237 1C21.8237 0.734784 21.7184 0.48043 21.5308 0.292893C21.3433 0.105357 21.0889 0 20.8237 0H3.82373C3.02808 0 2.26502 0.316071 1.70241 0.87868C1.1398 1.44129 0.82373 2.20435 0.82373 3V19C0.82373 19.7956 1.1398 20.5587 1.70241 21.1213C2.26502 21.6839 3.02808 22 3.82373 22H23.8237C24.3542 22 24.8629 21.7893 25.2379 21.4142C25.613 21.0391 25.8237 20.5304 25.8237 20V6C25.8237 5.46957 25.613 4.96086 25.2379 4.58579C24.8629 4.21071 24.3542 4 23.8237 4ZM19.3237 14C19.0271 14 18.737 13.912 18.4904 13.7472C18.2437 13.5824 18.0514 13.3481 17.9379 13.074C17.8244 12.7999 17.7947 12.4983 17.8526 12.2074C17.9104 11.9164 18.0533 11.6491 18.2631 11.4393C18.4728 11.2296 18.7401 11.0867 19.0311 11.0288C19.3221 10.9709 19.6237 11.0007 19.8978 11.1142C20.1718 11.2277 20.4061 11.42 20.5709 11.6666C20.7358 11.9133 20.8237 12.2033 20.8237 12.5C20.8237 12.8978 20.6657 13.2794 20.3844 13.5607C20.1031 13.842 19.7216 14 19.3237 14Z"
        fill="white"
      />
    </svg>
  );
}

export default WalletIcon;
