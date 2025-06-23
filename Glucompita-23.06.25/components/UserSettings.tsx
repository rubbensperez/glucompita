/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import Modal from './Modal';
import { useUI } from '@/lib/state';

export default function UserSettings() {
  const { setShowUserConfig } = useUI();

  return (
    <Modal onClose={() => setShowUserConfig(false)}>
      <div className="userSettings">
        {/* Form removed as per request */}
      </div>
    </Modal>
  );
}