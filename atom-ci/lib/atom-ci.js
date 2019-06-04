'use babel';

import AtomCiView from './atom-ci-view';
import {
    CompositeDisposable
} from 'atom';

export default {

    atomCiView: null,
    modalPanel: null,
    subscriptions: null,

    activate(state) {
        this.atomCiView = new AtomCiView(state.atomCiViewState);
        this.modalPanel = {
            element: document.createElement('div'),
            getTitle: () => 'Continuous Integration',
            getIconName: () => 'icon-sync',
            getURI: () => 'atom://atom-ci/atom-ci-view',
            serialize: () => {
                deserializer: this.atomCiView.serialize()
            },
            getDefaultLocation: () => 'bottom'
        };
        atom.workspace.open(this.modalPanel);

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'atom-ci:toggle': () => atom.workspace.toggle(this.modalPanel)
        }));
    },

    deactivate() {
        this.modalPanel.destroy();
        this.subscriptions.dispose();
        this.atomCiView.destroy();
    },

    serialize() {
        return {
            atomCiViewState: this.atomCiView.serialize()
        };
    },

    toggle() {
        console.log('AtomCi was toggled!');
        return (
            this.modalPanel.isVisible() ?
            this.modalPanel.hide() :
            this.modalPanel.show()
        );
    }

};
