"use client";

import { motion, MotionProps, Transition } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
      className={cn(className)}
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
      className={cn(className)}
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
      className={cn(className)}
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
      className={cn(className)}
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
      className={cn(className)}
      {...props}>
      {children}
    </motion.div>
  );
}

// Interactive motion wrapper for buttons and clickable elements
export function MotionInteractive({
  children,
  className,
  ...props
}: AnimateProps & Omit<MotionProps, keyof AnimateProps>) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(className)}
      {...props}>
      {children}
    </motion.div>
  );
}

// Header slide down animation
interface HeaderSlideMotionProps {
  children: ReactNode;
  className?: string;
}

export function HeaderSlideMotion({
  children,
  className,
}: HeaderSlideMotionProps) {
  return (
    <motion.header
      className={cn(className)}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}>
      {children}
    </motion.header>
  );
}

// Floating icon with rotation
interface FloatingIconMotionProps {
  children: ReactNode;
  className?: string;
}

export function FloatingIconMotion({
  children,
  className,
}: FloatingIconMotionProps) {
  return (
    <motion.div
      className={cn(className)}
      whileHover={{ rotate: 360, scale: 1.1 }}
      transition={{ duration: 0.5 }}>
      {children}
    </motion.div>
  );
}

// Card hover animation with scale and rotation
interface CardHoverMotionProps {
  children: ReactNode;
  className?: string;
  scaleOnHover?: number;
  rotateOnHover?: number;
}

export function CardHoverMotion({
  children,
  className,
  scaleOnHover = 1.1,
  rotateOnHover = 5,
}: CardHoverMotionProps) {
  return (
    <motion.div
      className={cn(className)}
      whileHover={{ scale: scaleOnHover, rotate: rotateOnHover }}
      transition={{ type: "spring", stiffness: 300 }}>
      {children}
    </motion.div>
  );
}

// Back button slide motion
interface BackBtnMotionProps {
  children: ReactNode;
  className?: string;
}

export function BackBtnMotion({ children, className }: BackBtnMotionProps) {
  return (
    <motion.div
      className={cn(className)}
      whileHover={{ x: -5 }}
      transition={{ duration: 0.2 }}>
      {children}
    </motion.div>
  );
}

// Slide left/right motion for links
interface SlideMotionProps {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right";
  distance?: number;
}

export function SlideMotion({
  children,
  className,
  direction = "right",
  distance = 5,
}: SlideMotionProps) {
  const slideValue = direction === "right" ? distance : -distance;

  return (
    <motion.div
      className={cn(className)}
      whileHover={{ x: slideValue }}
      transition={{ duration: 0.2 }}>
      {children}
    </motion.div>
  );
}

// Blob animation for decorative elements
interface BlobMotionProps {
  className?: string;
  scale?: [number, number, number];
  opacity?: [number, number, number];
  duration?: number;
  delay?: number;
}

export function BlobMotion({
  className,
  scale = [1, 1.2, 1],
  opacity = [0.3, 0.5, 0.3],
  duration = 8,
  delay = 0,
}: BlobMotionProps) {
  return (
    <motion.div
      className={cn(className)}
      animate={{
        scale,
        opacity,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

// Image scale on hover
interface ImageScaleMotionProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  duration?: number;
}

export function ImageScaleMotion({
  children,
  className,
  scale = 1.05,
  duration = 0.3,
}: ImageScaleMotionProps) {
  return (
    <motion.div
      className={cn(className)}
      whileHover={{ scale }}
      transition={{ duration }}>
      {children}
    </motion.div>
  );
}

// Badge scale animation
interface BadgeScaleMotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function BadgeScaleMotion({
  children,
  className,
  delay = 0.2,
}: BadgeScaleMotionProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200 }}>
      {children}
    </motion.div>
  );
}

// Card fade up for lists
interface CardFadeUpMotionProps {
  children: ReactNode;
  className?: string;
  initialY?: number;
  viewport?: { once: boolean; margin?: string };
}

export function CardFadeUpMotion({
  children,
  className,
  initialY = 20,
  viewport = { once: true, margin: "-50px" },
}: CardFadeUpMotionProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: initialY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -8 }}>
      {children}
    </motion.div>
  );
}

// Feature card animation with stagger
const featureItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface FeatureCardMotionProps {
  children: ReactNode;
  className?: string;
}

export function FeatureCardMotion({
  children,
  className,
}: FeatureCardMotionProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={featureItemVariants}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}>
      {children}
    </motion.div>
  );
}

// Button/Icon interactive motion
interface ButtonHoverMotionProps {
  children: ReactNode;
  className?: string;
}

export function ButtonHoverMotion({
  children,
  className,
}: ButtonHoverMotionProps) {
  return (
    <motion.div
      className={cn(className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}>
      {children}
    </motion.div>
  );
}

// Icon button hover
interface IconButtonMotionProps {
  children: ReactNode;
  className?: string;
}

export function IconButtonMotion({
  children,
  className,
}: IconButtonMotionProps) {
  return (
    <motion.div
      className={cn(className)}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}>
      {children}
    </motion.div>
  );
}

// Content fade in with initial opacity and y
interface ContentFadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ContentFadeIn({
  children,
  className,
  delay = 0.2,
}: ContentFadeInProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}>
      {children}
    </motion.div>
  );
}
