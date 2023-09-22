import { HTMLAttributes } from 'react';

interface SkeletonElement extends HTMLAttributes<HTMLDivElement> {
  lines: number;
}

function RectangleSkeleton(props: SkeletonElement) {
  const skeletons = [];

  for (let i = 0; i < props.lines ?? 1; i++) {
    skeletons.push(<div key={i} {...props}></div>);
  }

  return skeletons;
}

export default RectangleSkeleton;
