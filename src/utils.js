// @ts-nocheck
import * as vscode from 'vscode';

// import prettier from 'prettier';
import prettier from 'prettier/standalone';
import * as prettierPluginPhp from '@prettier/plugin-php/standalone';

export const formatSwagger = (comment) => {
    let match = comment.match(
        /(?<tag>@swagger\s|@openapi\s)(?<spec>[\s\S]+?)(?=^.*\*\/+)/m
    );

    if (!match ||
      !match.groups ||
      !('tag' in match.groups) ||
      !('spec' in match.groups)
    ) {
        return;
    }

    let { spec, tag } = match.groups;

    let tagIndentation = comment.match(
        /^(?<indent>\s*)(?:@swagger|@openapi)/m
    );

    if (!tagIndentation || !tagIndentation.groups || !tagIndentation.groups.indent) {
        tagIndentation = '';
    } else {
        tagIndentation = tagIndentation.groups.indent;
    }

    try {
        spec = prettier.format(spec, {
            plugins: [prettierPluginPhp],
            parser: 'php',
        });

        spec = spec
            .split('\n')
            .slice(0, -1)
            .map((e) => tagIndentation + ' * ' + e)
            .join('\n');

        spec = ' * ' + tag + spec + '\n';

        return comment.replace(match[0], spec);
    } catch (error) {
        vscode.window.showErrorMessage(error.message);
        console.log(error);
    }
};

export const unFormatSwagger = (comment) => {
    let match = comment.match(
        / \* (?<tag>@swagger\s|@openapi\s)(?<spec>[\s\S]+?)(?=^.*\*\/+)/m
    );

    if (!match ||
    !match.groups ||
    !('tag' in match.groups) ||
    !('spec' in match.groups)
    ) {
        return;
    }

    let { spec, tag } = match.groups;

    try {
        spec = spec
            .split('\n')
            .map((e) => {
                let match = e.match(/ \* (.*)$/);
                if (!match) {
                    return e;
                } else {
                    return match[1];
                }
            })
            .join('\n');

        spec = tag + spec;

        return comment.replace(match[0], spec);
    } catch (error) {
        vscode.window.showErrorMessage(error.message);
        console.log(error);
    }
};
