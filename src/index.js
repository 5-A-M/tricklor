import React from 'react';
import {hydrate, render} from 'react-dom';
import Wrapper from './Wrapper/Wrapper';

const root = document.getElementById('root')
if(root.hasChildNodes()) {
    hydrate(<Wrapper />, root)
}
else {
  render(<Wrapper />, root) 
}


