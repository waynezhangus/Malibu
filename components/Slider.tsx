import * as React from 'react';
import SliderUnstyled, {
  sliderUnstyledClasses,
  SliderUnstyledProps,
} from '@mui/base/SliderUnstyled';

export default function Slider(props: SliderUnstyledProps) {
  const css = `
    .m-slider .${sliderUnstyledClasses.markActive} {
      background-color: #fff;
    }
  `;
  return (
    <div>
      <style type="text/css">{css}</style>
      <SliderUnstyled
        {...props}
        className="m-slider"
        componentsProps={{
          thumb: {
            className:
              'bg-sky-400 h-4 w-4 -ml-2 -mt-1 box-border dark:shadow-gray-800 items-center justify-center rounded-full shadow-gray-300 shadow-md absolute',
          },
          root: {
            className:
              'w-full relative inline-block h-6 cursor-pointer touch-none',
          },
          rail: {
            className:
              'opacity-50 bg-gray-300 h-2 w-full rounded-full block absolute',
          },
          track: {
            className: 'opacity-50 bg-sky-400 h-2 absolute rounded-full block',
          },
          mark: {
            className:
              'absolute -ml-1 w-2 h-2 rounded-full bg-gray-300 opacity-80',
          },
          valueLabel: {
            className: 'text-sm block relative text-center -mt-4',
          },
        }}
      />
    </div>
  );
}
