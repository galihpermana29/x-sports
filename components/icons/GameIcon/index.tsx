import { SVGAttributes } from 'react';

function GameIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="33"
      height="24"
      viewBox="0 0 33 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path d="M22.3679 10.4355H19.2465C18.8326 10.4355 18.4356 10.2706 18.143 9.977C17.8503 9.68345 17.6858 9.2853 17.6858 8.87016C17.6858 8.45501 17.8503 8.05686 18.143 7.76331C18.4356 7.46975 18.8326 7.30483 19.2465 7.30483H22.3679C22.7818 7.30483 23.1787 7.46975 23.4714 7.76331C23.7641 8.05686 23.9285 8.45501 23.9285 8.87016C23.9285 9.2853 23.7641 9.68345 23.4714 9.977C23.1787 10.2706 22.7818 10.4355 22.3679 10.4355ZM13.0038 7.30483H12.4836V6.78306C12.4836 6.36791 12.3192 5.96976 12.0265 5.67621C11.7338 5.38266 11.3368 5.21774 10.9229 5.21774C10.509 5.21774 10.112 5.38266 9.81936 5.67621C9.52668 5.96976 9.36225 6.36791 9.36225 6.78306V7.30483H8.84203C8.42811 7.30483 8.03115 7.46975 7.73847 7.76331C7.44578 8.05686 7.28136 8.45501 7.28136 8.87016C7.28136 9.2853 7.44578 9.68345 7.73847 9.977C8.03115 10.2706 8.42811 10.4355 8.84203 10.4355H9.36225V10.9573C9.36225 11.3724 9.52668 11.7705 9.81936 12.0641C10.112 12.3577 10.509 12.5226 10.9229 12.5226C11.3368 12.5226 11.7338 12.3577 12.0265 12.0641C12.3192 11.7705 12.4836 11.3724 12.4836 10.9573V10.4355H13.0038C13.4177 10.4355 13.8147 10.2706 14.1074 9.977C14.4001 9.68345 14.5645 9.2853 14.5645 8.87016C14.5645 8.45501 14.4001 8.05686 14.1074 7.76331C13.8147 7.46975 13.4177 7.30483 13.0038 7.30483ZM31.3105 21.7762C30.8748 22.3993 30.3085 22.9193 29.6512 23.2997C28.994 23.68 28.2617 23.9116 27.5058 23.9781C26.7499 24.0446 25.9887 23.9444 25.2754 23.6846C24.5622 23.4248 23.9143 23.0116 23.3771 22.4741C23.3528 22.451 23.3298 22.4267 23.3082 22.4011L18.2932 16.6968H13.9571L8.94737 22.4011C8.92527 22.4258 8.90186 22.4506 8.87844 22.4741C8.0959 23.258 7.08463 23.7713 5.99144 23.9396C4.89826 24.1079 3.78004 23.9223 2.79913 23.4099C1.81822 22.8975 1.02565 22.0849 0.536492 21.09C0.0473289 20.0951 -0.112975 18.9697 0.0788507 17.8773C0.0781146 17.8686 0.0781146 17.8599 0.0788507 17.8512L2.20917 6.88611C2.54816 4.95741 3.55363 3.2101 5.0491 1.95086C6.54457 0.691616 8.43448 0.00091934 10.3871 0H21.8476C23.7942 0.00278259 25.6784 0.688894 27.1734 1.93931C28.6683 3.18973 29.6797 4.92556 30.0321 6.84567C30.0325 6.85393 30.0325 6.8622 30.0321 6.87046L32.1598 17.8499C32.1603 17.8586 32.1603 17.8673 32.1598 17.876C32.2823 18.5501 32.2703 19.2419 32.1245 19.9114C31.9787 20.5809 31.7021 21.2147 31.3105 21.7762ZM21.8476 13.5661C23.2274 13.5661 24.5506 13.0164 25.5262 12.0379C26.5018 11.0594 27.0499 9.73221 27.0499 8.34838C27.0499 6.96455 26.5018 5.6374 25.5262 4.65888C24.5506 3.68037 23.2274 3.13064 21.8476 3.13064H10.3884C9.16726 3.13185 7.98567 3.56495 7.0515 4.35373C6.11733 5.14252 5.49043 6.23646 5.28109 7.4431C5.28048 7.45222 5.28048 7.46138 5.28109 7.4705L3.15598 18.4277C3.06381 18.9714 3.18989 19.5295 3.50669 19.9802C3.82348 20.4309 4.30523 20.7375 4.84671 20.8331C5.16905 20.8895 5.5001 20.8692 5.81319 20.7738C6.12627 20.6784 6.41266 20.5106 6.64928 20.284L12.0804 14.097C12.2268 13.9303 12.4069 13.7967 12.6087 13.7052C12.8105 13.6136 13.0294 13.5662 13.2509 13.5661H21.8476ZM29.0996 18.433L28.1892 13.7435C27.4732 14.5927 26.5948 15.2895 25.6059 15.7927C24.6171 16.2959 23.5377 16.5953 22.4316 16.6733L25.6063 20.2892C25.9222 20.5932 26.3256 20.7895 26.7592 20.8502C27.1928 20.9109 27.6345 20.8328 28.0213 20.6272C28.4081 20.4216 28.7204 20.0988 28.9138 19.7049C29.1072 19.3109 29.1717 18.8658 29.0983 18.433H29.0996Z" />
    </svg>
  );
}

export default GameIcon;