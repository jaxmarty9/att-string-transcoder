import type { BinaryReader } from '../BinaryReader.js';
import type { BinaryString } from '../types/BinaryString.js';
import type { PresetHash } from '../types/PresetHash.js';
import { BinaryWriter } from '../BinaryWriter.js';
import { Component, type ComponentProps } from './Component.js';
import { ComponentHash } from '../types/ComponentHash.js';
import { SpeciesHash } from '../types/SpeciesHash.js';

type WoodcutTreeComponentPropsV3 = {
  presetHash?: 0 | PresetHash;
  speciesHash?: SpeciesHash;
};

type WoodcutTreeComponentProps = WoodcutTreeComponentPropsV3;

export class WoodcutTreeComponent extends Component {
  presetHash: 0 | PresetHash;
  speciesHash: SpeciesHash;

  constructor({ version, presetHash, speciesHash }: ComponentProps & WoodcutTreeComponentProps) {
    const hash = ComponentHash.WoodcutTree;
    const name = 'WoodcutTree';

    super({ hash, name, version });

    this.presetHash = presetHash ?? 0;
    this.speciesHash = speciesHash ?? SpeciesHash.Oak;
  }

  static override fromBinary(reader: BinaryReader, version: number): WoodcutTreeComponent {
    const props: ComponentProps & WoodcutTreeComponentProps = { version };

    /**
     * @property {number} presetHash
     * @since v3
     */
    if (props.version >= 3) {
      props.presetHash = reader.readUnsignedInteger();
    }

    /**
     * @property {number} speciesHash
     * @since v3
     */
    if (props.version >= 3) {
      props.speciesHash = reader.readUnsignedInteger();
    }

    return new WoodcutTreeComponent(props);
  }

  override toBinary(version = this.version): BinaryString {
    const writer = new BinaryWriter();

    /**
     * @property {number} presetHash
     * @since v3
     */

    /**
     * @property {number} presetHash
     * @since v3
     */
    if (version >= 3) {
      writer.writeUnsignedInteger(this.presetHash);
    }

    /**
     * @property {number} speciesHash
     * @since v3
     */
    if (version >= 3) {
      writer.writeUnsignedInteger(this.speciesHash);
    }

    return writer.flush();
  }
}
