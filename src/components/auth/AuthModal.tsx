import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'
import { X, Play } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: 'login' | 'signup'
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'signup'
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(defaultTab)

  const handleClose = () => {
    onClose()
    // Reset to signup tab when modal closes
    setTimeout(() => setActiveTab('signup'), 300)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
        <DialogHeader className="relative">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
              <Play className="w-5 h-5 text-white" />
            </div>
            <span className="font-montserrat font-bold text-xl text-white">
              adberg.ai
            </span>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex bg-gray-800/50 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-2 px-4 rounded-lg font-opensans font-medium transition-all duration-300 ${
                activeTab === 'signup'
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 px-4 rounded-lg font-opensans font-medium transition-all duration-300 ${
                activeTab === 'login'
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
          </div>

          {/* Form Content */}
          <div className="min-h-[400px]">
            {activeTab === 'login' ? (
              <LoginForm
                onSwitchToSignup={() => setActiveTab('signup')}
                onClose={handleClose}
              />
            ) : (
              <SignupForm
                onSwitchToLogin={() => setActiveTab('login')}
                onClose={handleClose}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
