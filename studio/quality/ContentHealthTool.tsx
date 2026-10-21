/**
 * "Content health" tab in the dashboard: one list of everything published
 * that still needs attention (missing translations, photos, descriptions...),
 * with a link to open each item. Uses the same rules as the field warnings.
 */
import {useCallback, useEffect, useState} from 'react'
import {useClient} from 'sanity'
import {IntentLink} from 'sanity/router'
import {Badge, Box, Button, Card, Container, Flex, Heading, Spinner, Stack, Text} from '@sanity/ui'
import {CheckmarkCircleIcon, RefreshIcon, WarningOutlineIcon} from '@sanity/icons'
import {buildReport, HEALTH_QUERY, type HealthReport} from './rules'

export function ContentHealthTool() {
  const client = useClient({apiVersion: '2024-01-01'})
  const [report, setReport] = useState<HealthReport>()
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(true)

  const load = useCallback(() => {
    setLoading(true)
    setError(undefined)
    client
      .fetch(HEALTH_QUERY, {}, {perspective: 'published'})
      .then((data) => setReport(buildReport(data)))
      .catch((e) => setError(String(e?.message ?? e)))
      .finally(() => setLoading(false))
  }, [client])

  useEffect(load, [load])

  const issues = report?.sections.reduce((n, s) => n + s.items.reduce((m, i) => m + i.issues.length, 0), 0) ?? 0
  const score = report && report.total ? Math.round((report.clean / report.total) * 100) : 0

  return (
    <Container width={2} padding={4} paddingY={5}>
      <Stack space={5}>
        <Flex align="flex-start" gap={3} wrap="wrap">
          <Stack space={3} flex={1}>
            <Heading size={3}>Content health</Heading>
            <Text muted size={2}>
              Everything published on the website that still needs attention. Fix an item, publish it, then refresh this
              page. These are suggestions; none of them stop you from publishing.
            </Text>
          </Stack>
          <Button icon={RefreshIcon} text="Refresh" mode="ghost" onClick={load} disabled={loading} />
        </Flex>

        {loading && !report && (
          <Flex justify="center" padding={5}>
            <Spinner muted />
          </Flex>
        )}
        {error && (
          <Card tone="critical" padding={4} radius={2} border>
            <Text>Could not load the report: {error}</Text>
          </Card>
        )}

        {report && (
          <Card tone={issues ? 'caution' : 'positive'} padding={4} radius={3} border>
            <Flex align="center" gap={4} wrap="wrap">
              <Heading size={4}>{score}%</Heading>
              <Stack space={2} flex={1}>
                <Text weight="semibold">
                  {report.clean} of {report.total} items are complete
                </Text>
                <Text size={1} muted>
                  {issues ? `${issues} things to fix, most important sections first.` : 'Nothing to fix. Nice work!'}
                </Text>
              </Stack>
            </Flex>
          </Card>
        )}

        {report?.sections.map((section) => (
          <Stack key={section.type} space={3}>
            <Flex align="center" gap={2}>
              <Text size={2} weight="semibold">
                {section.title}
              </Text>
              {section.items.length ? (
                <Badge tone="caution">{section.items.length} to fix</Badge>
              ) : (
                <Badge tone="positive">
                  <Flex align="center" gap={1}>
                    <CheckmarkCircleIcon /> All good
                  </Flex>
                </Badge>
              )}
            </Flex>
            {section.items.map(({doc, label, issues}) => (
              <Card key={doc._id} padding={3} radius={2} border>
                <Flex gap={3} align="flex-start">
                  <Box flex={1}>
                    <Stack space={3}>
                      <Text weight="medium">{label}</Text>
                      {issues.map((issue) => (
                        <Flex key={issue} gap={2} align="flex-start">
                          <Text size={1} muted>
                            <WarningOutlineIcon />
                          </Text>
                          <Text size={1} muted>
                            {issue}
                          </Text>
                        </Flex>
                      ))}
                    </Stack>
                  </Box>
                  <Button
                    as={IntentLink}
                    // @ts-expect-error IntentLink props pass through Button's `as`
                    intent="edit"
                    params={{id: doc._id, type: doc._type}}
                    text="Open"
                    mode="ghost"
                    fontSize={1}
                  />
                </Flex>
              </Card>
            ))}
          </Stack>
        ))}
      </Stack>
    </Container>
  )
}
