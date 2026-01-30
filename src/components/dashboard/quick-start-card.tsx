import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui'

interface QuickStartCardProps {
  title: string
  description: string
  icon: LucideIcon
  gradient: string
  link: string
  estimatedTime?: string
  index?: number
}

export function QuickStartCard({
  title,
  description,
  icon: Icon,
  gradient,
  link,
  estimatedTime = '5 min',
  index = 0,
}: QuickStartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={link}>
        <Card
          hover
          className="relative overflow-hidden group cursor-pointer h-full"
        >
          {/* Background gradient glow effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
          />

          {/* Content */}
          <div className="relative z-10 p-6">
            {/* Icon with animated gradient background */}
            <div className="mb-4 relative">
              <div
                className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${gradient} group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                <Icon className="w-7 h-7 text-white" />
              </div>

              {/* Time badge */}
              {estimatedTime && (
                <span className="absolute top-0 right-0 px-3 py-1.5 text-xs font-semibold text-text-primary bg-bg-surface/90 border border-border-subtle rounded-lg backdrop-blur-sm">
                  {estimatedTime}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#FF5C00] transition-colors">
              {title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-400 mb-4 line-clamp-2">
              {description}
            </p>

            {/* CTA */}
            <div className="flex items-center gap-2 text-brand-indigo text-sm font-medium">
              <span className="group-hover:gap-3 transition-all">Quick Start</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Animated border on hover */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-indigo/30 rounded-xl transition-colors duration-300" />
        </Card>
      </Link>
    </motion.div>
  )
}
