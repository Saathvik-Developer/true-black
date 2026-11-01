/**
 * Standardized Presenter Stage Configuration
 * All 6 presenters occupy the exact same standardized stage area and visual proportions.
 * Standard framing: Waist-up, eye-level locked, normalized headroom, bottom-anchored.
 */

export interface PresenterImageConfig {
  id: string;
  name: string;
  src: string;
  scale: number;
  objectPosition: string;
  objectFit: 'contain';
  horizontalOffset: number; // px
  verticalOffset: number;   // px
  maxHeight: string;
  framingType: 'waist-up';
}

export const PRESENTER_CONFIGS: Record<number, PresenterImageConfig> = {
  // Chapter 1: Understanding the Operation (IPO Model)
  0: {
    id: 'presenter-1',
    name: 'Presenter 1',
    src: '/images/presenters/presenter1.png',
    scale: 1.0,
    objectPosition: 'bottom center',
    objectFit: 'contain',
    horizontalOffset: 0,
    verticalOffset: 0,
    maxHeight: '100%',
    framingType: 'waist-up',
  },

  // Chapter 2: Four V's Profile Analysis
  1: {
    id: 'presenter-2',
    name: 'Presenter 2',
    src: '/images/presenters/presenter2.png',
    scale: 1.0,
    objectPosition: 'bottom center',
    objectFit: 'contain',
    horizontalOffset: 0,
    verticalOffset: 0,
    maxHeight: '100%',
    framingType: 'waist-up',
  },

  // Chapter 3: Operational Performance Objectives
  2: {
    id: 'presenter-3',
    name: 'Presenter 3',
    src: '/images/presenters/presenter3.png',
    scale: 1.0,
    objectPosition: 'bottom center',
    objectFit: 'contain',
    horizontalOffset: 0,
    verticalOffset: 0,
    maxHeight: '100%',
    framingType: 'waist-up',
  },

  // Chapter 4: Process Design & Layout Topology
  3: {
    id: 'presenter-4',
    name: 'Presenter 4',
    src: '/images/presenters/presenter4.png',
    scale: 1.0,
    objectPosition: 'bottom center',
    objectFit: 'contain',
    horizontalOffset: 0,
    verticalOffset: 0,
    maxHeight: '100%',
    framingType: 'waist-up',
  },

  // Chapter 5: Operational Strategy Alignment & Positioning
  4: {
    id: 'presenter-5',
    name: 'Presenter 5',
    src: '/images/presenters/presenter5.png',
    scale: 1.0,
    objectPosition: 'bottom center',
    objectFit: 'contain',
    horizontalOffset: 0,
    verticalOffset: 0,
    maxHeight: '100%',
    framingType: 'waist-up',
  },

  // Chapter 6: Practical Recommendations & Implementation
  5: {
    id: 'presenter-6',
    name: 'Presenter 6',
    src: '/images/presenters/presenter6.png',
    scale: 1.0,
    objectPosition: 'bottom center',
    objectFit: 'contain',
    horizontalOffset: 0,
    verticalOffset: 0,
    maxHeight: '100%',
    framingType: 'waist-up',
  },
};
