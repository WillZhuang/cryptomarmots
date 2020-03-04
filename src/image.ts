import sharp from 'sharp';

sharp('./doug.png')
    .tint('#11717c')
    .toFile('out.png')
