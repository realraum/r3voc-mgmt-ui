import type { FC } from 'react';
import { useMemo } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import FileListing from '@/components/FileListing';
import { useApiStore } from '@/stores/apistore';

const TalkListing: FC = () => {
    const schedule = useApiStore(state => state.schedule);

    const talks = useMemo(
        () =>
            schedule?.conference.days.flatMap(day =>
                Object.values(day.rooms).flat(),
            ),
        [schedule],
    );

    return (
        <Box display="flex" flexDirection="column" gap={1} my={2}>
            {talks?.map(talk => {
                const date = talk.date
                    ? new Date(talk.date).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                          timeZoneName: 'long',
                      })
                    : 'N/A';

                return (
                    <Accordion key={talk.guid}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Box
                                display="flex"
                                flexDirection="row"
                                justifyContent="space-between"
                                width="100%"
                            >
                                <Box>
                                    <Typography variant="h5">
                                        {talk.title}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        color="textSecondary"
                                    >
                                        {talk.subtitle || 'No subtitle'}
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                    alignSelf="center"
                                >
                                    {date}
                                </Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <strong>Speaker(s):</strong>{' '}
                                {talk.persons
                                    // eslint-disable-next-line deprecation/deprecation
                                    .map(p => p.public_name || p.name)
                                    .join(', ')}
                            </Typography>
                            <Typography>
                                <strong>Abstract:</strong>{' '}
                                {talk.abstract || 'N/A'}
                            </Typography>
                            <Typography>
                                <strong>Language:</strong>{' '}
                                {talk.language || 'N/A'}
                            </Typography>
                            <Typography>
                                <strong>Date:</strong> {date}
                            </Typography>
                            <Typography>
                                <strong>Duration:</strong>{' '}
                                {talk.duration || 'N/A'}
                            </Typography>
                            <Typography>
                                <strong>GUID:</strong> {talk.guid}
                            </Typography>
                            <Typography>
                                {/* eslint-disable-next-line deprecation/deprecation */}
                                <strong>ID:</strong> {talk.id || 'N/A'}
                            </Typography>
                            <textarea
                                readOnly
                                style={{ width: '100%', marginTop: '10px' }}
                                rows={6}
                                value={
                                    talk.description ||
                                    'No description provided.'
                                }
                            />
                            <FileListing guid={talk.guid} />
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </Box>
    );
};

export default TalkListing;
