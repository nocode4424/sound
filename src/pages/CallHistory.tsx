import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, Modal } from '@/components/ui'
import { useConversations } from '@/hooks/useConversations'
import type { Conversation, TranscriptEntry } from '@/types'
import { Phone, Clock, MessageSquare, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatDuration, formatDate } from '@/lib/utils'

export default function CallHistory() {
  const { conversations, loading } = useConversations()
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [showTranscript, setShowTranscript] = useState(false)

  const getSentimentIcon = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-success" />
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-error" />
      default:
        return <Minus className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ended':
        return 'text-success'
      case 'failed':
        return 'text-error'
      case 'connected':
        return 'text-electric-blue'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Call History</h1>
          <p className="text-gray-400">View all your voice agent conversations</p>
        </div>

        {/* Call List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass rounded-xl p-6 h-24 animate-pulse" />
            ))}
          </div>
        ) : conversations.length === 0 ? (
          <Card className="text-center py-12">
            <Phone className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No calls yet</h3>
            <p className="text-gray-400">
              Your call history will appear here once you start testing agents.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {conversations.map((conversation, index) => (
              <motion.div
                key={conversation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card hover className="cursor-pointer" onClick={() => {
                  setSelectedConversation(conversation)
                  setShowTranscript(true)
                }}>
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="text-white font-medium">
                          Call with Agent
                        </p>
                        <span className={`text-sm ${getStatusColor(conversation.status)}`}>
                          {conversation.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {conversation.duration_seconds
                              ? formatDuration(conversation.duration_seconds)
                              : 'N/A'}
                          </span>
                        </div>
                        <div>{formatDate(conversation.created_at)}</div>
                        {conversation.sentiment && (
                          <div className="flex items-center gap-1">
                            {getSentimentIcon(conversation.sentiment)}
                            <span className="capitalize">{conversation.sentiment}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* View Transcript Button */}
                    <div className="flex items-center gap-2 text-electric-blue">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm font-medium">View Transcript</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Transcript Modal */}
        {selectedConversation && (
          <Modal
            isOpen={showTranscript}
            onClose={() => {
              setShowTranscript(false)
              setSelectedConversation(null)
            }}
            title="Call Transcript"
            size="lg"
          >
            <div className="space-y-4">
              {/* Call Details */}
              <div className="glass rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400 mb-1">Duration</p>
                    <p className="text-white font-medium">
                      {selectedConversation.duration_seconds
                        ? formatDuration(selectedConversation.duration_seconds)
                        : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Status</p>
                    <p className={`font-medium ${getStatusColor(selectedConversation.status)}`}>
                      {selectedConversation.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Date</p>
                    <p className="text-white font-medium">
                      {formatDate(selectedConversation.created_at)}
                    </p>
                  </div>
                  {selectedConversation.sentiment && (
                    <div>
                      <p className="text-gray-400 mb-1">Sentiment</p>
                      <div className="flex items-center gap-1">
                        {getSentimentIcon(selectedConversation.sentiment)}
                        <p className="text-white font-medium capitalize">
                          {selectedConversation.sentiment}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Transcript */}
              <div className="glass rounded-lg p-4 max-h-96 overflow-y-auto">
                <h3 className="text-sm font-semibold text-gray-400 mb-3">Transcript</h3>
                {selectedConversation.transcript &&
                Array.isArray(selectedConversation.transcript) &&
                selectedConversation.transcript.length > 0 ? (
                  <div className="space-y-3">
                    {(selectedConversation.transcript as TranscriptEntry[]).map((entry, index) => (
                      <div
                        key={index}
                        className={`text-sm ${
                          entry.role === 'agent' ? 'text-electric-blue' : 'text-white'
                        }`}
                      >
                        <span className="font-semibold">
                          {entry.role === 'agent' ? 'Agent' : 'You'}:{' '}
                        </span>
                        <span className="text-gray-300">{entry.content}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No transcript available</p>
                )}
              </div>

              {/* Summary */}
              {selectedConversation.summary && (
                <div className="glass rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-400 mb-2">Summary</h3>
                  <p className="text-gray-300 text-sm">{selectedConversation.summary}</p>
                </div>
              )}
            </div>
          </Modal>
        )}
      </div>
    </DashboardLayout>
  )
}
