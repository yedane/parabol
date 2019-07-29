import React from 'react'
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

// NOTE: Let’s set this up!
//    1. PATHS    for leaves of the logo
//    2. DURATION for the overall animation
//    3. DELAY    for staggered leaf animation
//    4. TIMING   for staggered leaf animation

/* eslint-disable max-len */
const PATHS = [
  'M25.5498,12.251 C25.6528,11.927 25.7528,11.603 25.8398,11.282 C25.8938,11.084 25.9388,10.889 25.9868,10.691 C26.0578,10.402 26.1258,10.114 26.1838,9.829 C26.2258,9.624 26.2608,9.422 26.2958,9.219 C26.3218,9.07 26.3568,8.918 26.3788,8.77 C29.3248,10.187 30.9998,12.101 30.9998,14.079 C30.9998,16.191 29.0948,18.228 25.7748,19.667 C25.3768,19.839 24.9618,19.997 24.5368,20.147 C24.4078,20.193 24.2738,20.234 24.1418,20.277 C23.8378,20.378 23.5288,20.475 23.2118,20.564 C23.0548,20.608 22.8968,20.65 22.7368,20.692 C22.4228,20.773 22.1038,20.849 21.7788,20.92 C21.6208,20.953 21.4648,20.989 21.3048,21.022 C21.2328,21.035 21.1638,21.054 21.0908,21.067 C21.0938,21.064 21.0958,21.061 21.0978,21.058 C21.7258,20.187 22.3178,19.273 22.8618,18.329 C23.4178,17.367 23.9038,16.371 24.3518,15.365 C24.5158,14.998 24.6918,14.635 24.8388,14.265 C25.0408,13.76 25.2238,13.259 25.3918,12.762 C25.4488,12.59 25.4958,12.422 25.5498,12.251',
  'M25.0918,21.0039 C24.9058,21.0719 24.7208,21.1399 24.5298,21.2029 C24.2488,21.2979 23.9598,21.3849 23.6678,21.4699 C23.4778,21.5249 23.2888,21.5829 23.0938,21.6349 C22.7728,21.7199 22.4408,21.7949 22.1078,21.8689 C21.9328,21.9079 21.7628,21.9509 21.5858,21.9869 C21.0708,22.0909 20.5468,22.1839 20.0088,22.2619 C19.6138,22.3179 19.2078,22.3549 18.8058,22.3969 C16.6538,22.6179 14.4108,22.6349 12.2578,22.4159 C12.2528,22.4159 12.2488,22.4159 12.2448,22.4149 C12.2928,22.4709 12.3438,22.5219 12.3928,22.5769 C12.4958,22.6949 12.6018,22.8089 12.7068,22.9249 C12.9358,23.1759 13.1658,23.4199 13.3988,23.6559 C13.5118,23.7709 13.6238,23.8839 13.7378,23.9939 C13.9798,24.2299 14.2228,24.4539 14.4658,24.6719 C14.5668,24.7619 14.6668,24.8559 14.7678,24.9419 C15.1108,25.2349 15.4538,25.5159 15.7978,25.7719 C18.6788,27.9079 21.4208,28.5589 23.2498,27.5039 C24.9648,26.5129 25.7848,24.1059 25.5388,20.8459 C25.3948,20.9019 25.2388,20.9499 25.0918,21.0039',
  'M13.8486,25.4648 C13.6226,25.2658 13.3996,25.0548 13.1766,24.8418 C13.0366,24.7078 12.8966,24.5768 12.7576,24.4378 C12.5176,24.1948 12.2806,23.9398 12.0426,23.6818 C11.9286,23.5558 11.8126,23.4368 11.6986,23.3078 C11.3506,22.9128 11.0066,22.5038 10.6696,22.0758 C10.4226,21.7618 10.1966,21.4278 9.9606,21.1038 C9.3116,20.2088 8.6916,19.2888 8.1386,18.3288 C7.5936,17.3858 7.0986,16.4178 6.6596,15.4398 L6.6536,15.4278 C6.6276,15.5008 6.6076,15.5728 6.5826,15.6468 C6.5336,15.7938 6.4886,15.9418 6.4406,16.0878 C6.3376,16.4088 6.2426,16.7278 6.1556,17.0438 C6.1116,17.2028 6.0686,17.3618 6.0286,17.5208 C5.9496,17.8348 5.8786,18.1468 5.8146,18.4548 C5.7856,18.5968 5.7526,18.7378 5.7266,18.8788 C5.6456,19.3188 5.5756,19.7548 5.5266,20.1828 C5.1126,23.7788 5.9226,26.4468 7.7496,27.5038 C9.4646,28.4908 11.9856,27.9838 14.6606,26.1568 C14.5366,26.0588 14.4156,25.9468 14.2926,25.8448 C14.1446,25.7198 13.9956,25.5958 13.8486,25.4648',
  'M4.623,19.3906 C4.644,19.2446 4.68,19.0926 4.705,18.9456 C4.74,18.7416 4.775,18.5376 4.817,18.3326 C4.876,18.0456 4.944,17.7556 5.016,17.4646 C5.062,17.2706 5.107,17.0776 5.16,16.8826 C5.248,16.5576 5.35,16.2286 5.454,15.8986 C5.506,15.7326 5.553,15.5686 5.608,15.4006 C5.776,14.9026 5.959,14.4006 6.161,13.8936 C6.309,13.5256 6.485,13.1606 6.649,12.7926 C7.096,11.7916 7.581,10.7966 8.139,9.8286 C8.685,8.8836 9.275,7.9706 9.901,7.1056 C9.903,7.1016 9.906,7.0976 9.908,7.0946 C9.834,7.1096 9.763,7.1266 9.688,7.1426 C9.538,7.1716 9.391,7.2066 9.242,7.2386 C8.912,7.3106 8.586,7.3876 8.267,7.4706 C8.104,7.5126 7.944,7.5556 7.785,7.6006 C7.472,7.6896 7.166,7.7846 6.865,7.8826 C6.728,7.9276 6.589,7.9706 6.455,8.0176 C6.031,8.1666 5.619,8.3246 5.228,8.4936 C1.905,9.9326 0,11.9686 0,14.0786 C0,16.0586 1.675,17.9726 4.623,19.3906',
  'M5.9102,7.1553 C6.0952,7.0883 6.2792,7.0213 6.4682,6.9573 C6.7542,6.8613 7.0492,6.7733 7.3452,6.6873 C7.5292,6.6343 7.7112,6.5783 7.8992,6.5273 C8.2342,6.4393 8.5782,6.3613 8.9242,6.2853 C9.0862,6.2493 9.2432,6.2093 9.4082,6.1763 C9.9242,6.0713 10.4512,5.9783 10.9912,5.9003 C11.3892,5.8433 11.7932,5.8063 12.1962,5.7653 C14.3632,5.5393 16.5762,5.5213 18.7442,5.7453 C18.7482,5.7463 18.7522,5.7463 18.7562,5.7463 C18.7082,5.6903 18.6582,5.6403 18.6102,5.5853 C18.5042,5.4643 18.3952,5.3483 18.2882,5.2303 C18.0642,4.9843 17.8402,4.7453 17.6112,4.5133 C17.4922,4.3923 17.3732,4.2733 17.2542,4.1573 C17.0212,3.9313 16.7872,3.7153 16.5532,3.5053 C16.4432,3.4083 16.3362,3.3073 16.2262,3.2153 C15.8862,2.9223 15.5442,2.6433 15.2022,2.3903 C13.2322,0.9273 11.3432,0.1553 9.7352,0.1553 C8.9952,0.1553 8.3272,0.3243 7.7502,0.6563 C6.0362,1.6453 5.2172,4.0523 5.4632,7.3143 C5.6072,7.2583 5.7632,7.2103 5.9102,7.1553',
  'M17.1484,2.6924 C17.3774,2.8944 17.6044,3.1084 17.8304,3.3254 C17.9674,3.4574 18.1054,3.5854 18.2414,3.7214 C18.4834,3.9644 18.7204,4.2204 18.9584,4.4804 C19.0734,4.6064 19.1894,4.7254 19.3034,4.8554 C19.6514,5.2504 19.9944,5.6584 20.3314,6.0874 C20.5764,6.3984 20.8044,6.7344 21.0414,7.0594 C21.6834,7.9444 22.3004,8.8604 22.8604,9.8294 C23.4034,10.7694 23.8994,11.7384 24.3404,12.7214 C24.3404,12.7214 24.3434,12.7284 24.3454,12.7324 C24.3694,12.6644 24.3874,12.5964 24.4114,12.5294 C24.4634,12.3744 24.5104,12.2194 24.5604,12.0644 C24.6614,11.7494 24.7554,11.4334 24.8424,11.1214 C24.8864,10.9604 24.9294,10.7984 24.9704,10.6394 C25.0504,10.3224 25.1224,10.0074 25.1864,9.6974 C25.2154,9.5564 25.2484,9.4164 25.2744,9.2774 C25.3574,8.8364 25.4274,8.4004 25.4754,7.9774 C25.8894,4.3794 25.0794,1.7124 23.2504,0.6564 C21.5364,-0.3286 19.0144,0.1764 16.3394,2.0044 C16.4644,2.1034 16.5864,2.2154 16.7104,2.3194 C16.8564,2.4414 17.0024,2.5644 17.1484,2.6924'
]
/* eslint-enable max-len */
const DURATION = '3s'
const DELAY = 150
const TIMING = 100 / PATHS.length

const keyframesRotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}`

const keyframesOpacity = keyframes`
  0% {
    opacity: .25;
  }
  ${TIMING}% {
    opacity: 1;
  }
  ${TIMING * 2}% {
    opacity: 1;
  }
  100% {
    opacity: .25;
  }
}`

const Root = styled('div')<Pick<Props, 'width'>>(({width}) => ({
  display: 'inline-block',
  height: width * 1.11,
  position: 'relative',
  width
}))

const Block = styled('div')<Pick<Props, 'width'>>(({width}) => ({
  left: '50%',
  position: 'absolute',
  top: '50%',
  transform: 'translate3d(-50%, -50%, 0)',
  width
}))

const SVG = styled('svg')<Pick<Props, 'delay' | 'width'>>(({delay, width}) => ({
  animationDelay: `${delay}ms`,
  animationDuration: DURATION,
  animationIterationCount: 'infinite',
  animationName: keyframesRotate.toString(),
  animationTimingFunction: 'cubic-bezier(.8, 0, .1, 1)',
  width
}))

const Path = styled('path')<Pick<Props, 'delay' | 'fill'>>(({delay, fill}) => ({
  animationDelay: `${delay}ms`,
  animationDuration: DURATION,
  animationIterationCount: 'infinite',
  animationName: keyframesOpacity.toString(),
  animationFillMode: 'forwards',
  animationTimingFunction: 'ease-in-out',
  fill,
  opacity: 0.25
}))

interface Props {
  fill: string
  width: number
  // useful for making it seem like a loader was never unmounted
  delay?: number
}

const Spinner = (props: Props) => {
  const {fill, width, delay = 0} = props
  return (
    <Root width={width}>
      <Block width={width}>
        <SVG
          width={width}
          delay={delay}
          viewBox='0 0 31 28'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
        >
          {PATHS.map((p, i) => (
            <Path
              delay={delay}
              fill={fill}
              style={{animationDelay: `${DELAY * i + delay}ms`}}
              key={`path${i}`}
              d={p}
            />
          ))}
        </SVG>
      </Block>
    </Root>
  )
}

export default Spinner
