
import React from 'react';
import { FixedSizeList as List } from 'react-window';

const MyVirtualizedList = () => {
  const items = Array.from({ length: 1000 }, (_, i) => `Item #${i}`);

  const Row = ({ index, style }) => (
    <div style={{ ...style, padding: '10px', borderBottom: '2px solid #ccc' }}>
      {items[index]}
    </div>
  );

  return (
    <><div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
          <h1 style={{ textAlign: 'center', color: 'blue'}}>Virtualized List Example</h1>
          <p style={{ textAlign: 'center', color: 'blue' }}>Scroll down to see more items!</p>
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

export default MyVirtualizedList;
