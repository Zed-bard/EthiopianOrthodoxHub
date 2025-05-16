import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
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
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ProfilePaper = styled(Paper)({
  padding: 3,
  maxWidth: 400,
  margin: 'auto',
  textAlign: 'center',
});

const ProfileAvatar = styled(Avatar)({
  width: 48,
  height: 48,
  margin: 2,
});

const AuthButton = styled(Button)({
  margin: 1,
  textTransform: 'none',
});

const Profile: React.FC = () => {
  const { user, signInWithGoogle, signInWithTelegram, signOut, resetPassword } = useAuth();
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
    <Box sx={{ mt: 4 }}>
      {user ? (
        <ProfilePaper elevation={3}>
          <ProfileAvatar src={user.photoURL || undefined}>
            {user.displayName?.[0] || 'U'}
          </ProfileAvatar>
          <Typography variant="h6" gutterBottom>
            {user.displayName}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {user.email}
          </Typography>
          <Box sx={{ mt: 3 }}>
            <AuthButton
              variant="contained"
              color="error"
              onClick={signOut}
              startIcon={<LockIcon />}
            >
              Sign Out
            </AuthButton>
            <Button
              variant="outlined"
              onClick={() => setOpenResetDialog(true)}
              startIcon={<EmailIcon />}
            >
              Reset Password
            </Button>
          </Box>
        </ProfilePaper>
      ) : (
        <ProfilePaper elevation={3}>
          <Typography variant="h6" gutterBottom>
            Sign In
          </Typography>
          <Box sx={{ mt: 3 }}>
            <AuthButton
              variant="contained"
              color="primary"
              onClick={signInWithGoogle}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </AuthButton>
            <AuthButton
              variant="contained"
              color="secondary"
              onClick={signInWithTelegram}
              startIcon={<TelegramIcon />}
            >
              Sign in with Telegram
            </AuthButton>
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
