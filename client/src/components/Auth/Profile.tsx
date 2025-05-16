import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../lib/LanguageContext';
import {
  Box,
  Paper,
  Avatar,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
import {
  Google as GoogleIcon,
  Telegram as TelegramIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link } from 'wouter';

const ProfilePaper = styled(Paper)({
  padding: '1.5rem',
  maxWidth: 500,
  margin: 'auto',
  textAlign: 'center',
  borderRadius: '0.75rem',
});

const ProfileAvatar = styled(Avatar)({
  width: 80,
  height: 80,
  margin: '1rem auto',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
});

const AuthButton = styled(Button)({
  margin: '0.5rem',
  padding: '0.5rem 1.25rem',
  borderRadius: '0.5rem',
  textTransform: 'none',
  fontWeight: 500,
});

const Profile: React.FC = () => {
  const { user, signInWithGoogle, signInWithTelegram, signOut, resetPassword } = useAuth();
  const { t } = useLanguage();
  const [openResetDialog, setOpenResetDialog] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  const handleResetPassword = async () => {
    try {
      await resetPassword(email);
      setOpenResetDialog(false);
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  const handleCloseResetDialog = () => {
    setOpenResetDialog(false);
    setEmail('');
    setError(null);
  };

  return (
    <Box sx={{ mt: 1 }}>
      {user ? (
        <ProfilePaper elevation={3}>
          <ProfileAvatar src={user.photoURL || undefined}>
            {user.displayName?.[0] || 'U'}
          </ProfileAvatar>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#722F37' }}>
            {user.displayName || t('profile', 'title')}
          </Typography>
          <Typography color="textSecondary" variant="body2" sx={{ mb: 2 }}>
            {user.email}
          </Typography>
          
          <Box sx={{ 
            p: 2, 
            bgcolor: '#f8f5f6', 
            borderRadius: 2, 
            mb: 3,
            mt: 2
          }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              {t('profile', 'accountInfo')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
              {t('profile', 'signInProvider')}: {user.provider || 'Not specified'}
            </Typography>
          </Box>
          
          <Box sx={{ mt: 3, display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, justifyContent: 'center', gap: 1 }}>
            <Link href="/">
              <AuthButton
                variant="contained"
                color="primary"
                startIcon={<HomeIcon />}
                sx={{ bgcolor: '#4285F4' }}
              >
                {t('profile', 'backToHome')}
              </AuthButton>
            </Link>
            <AuthButton
              variant="contained"
              color="error"
              onClick={signOut}
              startIcon={<LockIcon />}
              sx={{ bgcolor: '#722F37' }}
            >
              {t('profile', 'signOut')}
            </AuthButton>
            <Button
              variant="outlined"
              onClick={() => setOpenResetDialog(true)}
              startIcon={<EmailIcon />}
              sx={{ borderColor: '#722F37', color: '#722F37' }}
            >
              Reset Password
            </Button>
          </Box>
        </ProfilePaper>
      ) : (
        <ProfilePaper elevation={3}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#722F37', mb: 2 }}>
              {t('profile', 'signIn')}
            </Typography>
            <Typography color="textSecondary" variant="body2" sx={{ mb: 3 }}>
              {t('profile', 'accessAccount')}
            </Typography>
          </Box>
          
          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <AuthButton
              variant="contained"
              color="primary"
              onClick={signInWithGoogle}
              startIcon={<GoogleIcon />}
              sx={{ bgcolor: '#4285F4' }}
            >
              Sign in with Google
            </AuthButton>
            <AuthButton
              variant="contained"
              color="secondary"
              onClick={signInWithTelegram}
              startIcon={<TelegramIcon />}
              sx={{ bgcolor: '#0088cc' }}
            >
              Sign in with Telegram
            </AuthButton>
            <Link href="/">
              <AuthButton
                variant="outlined"
                color="primary"
                startIcon={<HomeIcon />}
                sx={{ borderColor: '#722F37', color: '#722F37' }}
              >
                {t('profile', 'backToHome')}
              </AuthButton>
            </Link>
          </Box>
        </ProfilePaper>
      )}

      <Dialog open={openResetDialog} onClose={handleCloseResetDialog}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResetDialog}>Cancel</Button>
          <Button onClick={handleResetPassword} variant="contained">
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
