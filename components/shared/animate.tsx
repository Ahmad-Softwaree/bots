"use client";

import { motion, MotionProps, Transition } from "framer-motion";
import { ReactNode } from "react";

// Fade in animation
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Slide up animation
export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

// Slide down animation
export const slideDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Scale animation
export const scale = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

// Stagger container animation
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Animation components
interface AnimateProps {
  children: ReactNode;
  className?: string;
  transition?: Transition;
}

export function FadeIn({
  children,
  className,
  transition,
  ...props
}: AnimateProps & Omit<MotionProps, keyof AnimateProps>) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
      transition={transition || { duration: 0.5, ease: "easeOut" }}
      className={className}
      {...props}>
      {children}
    </motion.div>
  );
}

export function SlideUp({
  children,
  className,
  transition,
  ...props
}: AnimateProps & Omit<MotionProps, keyof AnimateProps>) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={slideUp}
      transition={transition || { duration: 0.5, ease: "easeOut" }}
      className={className}
      {...props}>
      {children}
    </motion.div>
  );
}

export function SlideDown({
  children,
  className,
  transition,
  ...props
}: AnimateProps & Omit<MotionProps, keyof AnimateProps>) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={slideDown}
      transition={transition || { duration: 0.5, ease: "easeOut" }}
      className={className}
      {...props}>
      {children}
    </motion.div>
  );
}

export function Scale({
  children,
  className,
  transition,
  ...props
}: AnimateProps & Omit<MotionProps, keyof AnimateProps>) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={scale}
      transition={transition || { duration: 0.5, ease: "easeOut" }}
      className={className}
      {...props}>
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  ...props
}: AnimateProps & Omit<MotionProps, keyof AnimateProps>) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className={className}
      {...props}>
      {children}
    </motion.div>
  );
}
