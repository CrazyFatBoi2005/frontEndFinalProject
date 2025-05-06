
import React from 'react';
import { FixedSizeList as List } from 'react-window';

const MusicLib = () => {
  const items = Array.from({ length: 1000 }, (_, i) => `Track ${i}`);

  const Row = ({ index, style }) => (
    <div style={{ ...style, padding: '10px', borderBottom: '2px solid #ccc' }}>
      {items[index]}
    </div>
  );

  return (
    <><div style={{ padding: '20px,', backgroundColor: '#f0f0f0', borderRadius: '5px'}}>
          <h1 style={{ textAlign: 'center', color: 'blue'}}>MusicLib</h1>
      </div><List
          height={400}
          itemCount={items.length}
          itemSize={50}
          width="100%"
      >
              {Row}
          </List></>
  );
};

export default MusicLib;
