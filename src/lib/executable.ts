import { Command } from 'commander';
import { ProductDefinition } from './types';
import { product } from './product';
import { executeCommand } from './execute-command';
import { home } from './home';
import * as fs from 'fs';

export const executable = (definition: ProductDefinition) => {
    const program = new Command();

    // options
    program.option(
        '--amps-version <ampsVersion>',
        'with amps version',
        '8.8.1'
    );
    program.option('--with-plugins <withPlugins>', 'with plugins', '');

    // commands
    program
        .command('start <productVersion>')
        .description(`runs ${definition.name}`)
        .action((productVersion) => {
            const options = program.opts();
            const { ampsVersion, withPlugins } = options;
            const start = product(definition).startCmd({
                ampsVersion,
                productVersion,
                withPlugins
            });
            executeCommand(start);
        });

    program
        .command('debug <productVersion>')
        .description(`runs ${definition.name} in debug mode`)
        .action((productVersion) => {
            const options = program.opts();
            const { ampsVersion, withPlugins } = options;
            const debug = product(definition).debugCmd({
                ampsVersion,
                productVersion,
                withPlugins
            });
            executeCommand(debug);
        });

    program
        .command('logs <productVersion>')
        .description(`tails ${definition.name} log file`)
        .action((productVersion) => {
            const log = product(definition).logCmd({ productVersion });
            executeCommand(log);
        });

    program
        .command('list')
        .description(`lists installed ${definition.name} instances`)
        .action(() => {
            product(definition)
                .listInstances()
                .forEach((i) => console.info(i));
        });

    program
        .command('versions')
        .description(
            `lists available ${definition.name} versions in local maven repo`
        )
        .action(() => {
            product(definition)
                .listVersions()
                .forEach((v) => console.info(v));
        });

    return program;
};
