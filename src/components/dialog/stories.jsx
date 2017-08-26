import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';

import Dialog from './dialog';
import Button from '../button/index';

/**
 * A component which creates a fully working drawer for the story.
 *
 * @class
 */
class DialogStory extends PureComponent {
  static ModalElement = ({ close }) => (
    <div>
      <Dialog.Header>Dialog Header</Dialog.Header>

      <Dialog.Content>Dialog Content</Dialog.Content>

      <Dialog.Buttons>
        <Button onRelease={close}>Cancel</Button>
        <Button onRelease={close}>Accept</Button>
      </Dialog.Buttons>
    </div>
  );

  /**
   * Open the dialog when the button is pressed.
   */
  handlePress = () => {
    this.dialog.open();
  };

  render() {
    return (
      <Dialog.Controller>
        <div
          style={{
            flex: 1,
            alignSelf: 'stretch',
          }}
        >
          <Dialog.Container />

          <div>
            <Button onRelease={this.handlePress}>Open Modal</Button>

            <Dialog
              ref={(elem) => { this.dialog = elem; }}
              component={DialogStory.ModalElement}
            />
          </div>
        </div>
      </Dialog.Controller>
    );
  }
}

storiesOf('Dialog', module)
  .add('Story', () => (
    <DialogStory />
  ));
