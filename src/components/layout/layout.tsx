import React from 'react';
import './layout.scss';

type Props = {
  content: React.ReactNode;
  aside: React.ReactNode;
};

export default function Layout(props: Props) {
  const { content, aside } = props;
  return (
    <div className="layout">
      <div className="layout_content">{content}</div>
      <div className="layout_aside">{aside}</div>
    </div>
  );
}
